// Load modules.
var OAuth2Strategy = require('passport-oauth2')
	, util = require('util')
	, Profile = require('./profile')
	, InternalOAuthError = require('passport-oauth2').InternalOAuthError
	, APIError = require('./errors/apierror');

var fs = require('fs');
var log_file = fs.createWriteStream('/usr/src/nodebb/logs/dataporten.log', {flags : 'w'});

/**
 * `Strategy` constructor.
 *
 * The Dataporten authentication strategy authenticates requests by delegating to
 * Dataportenusing the OAuth 2.0 protocol.
 *
 * Options:
 *   - `clientID`      your Dataporten application's Client ID
 *   - `clientSecret`  your Dataporten application's Client Secret
 *   - `callbackURL`   URL to which Dataporten will redirect the user after granting authorization
 *   — `userAgent`     All API requests MUST include a valid User Agent string.
 *                     e.g: domain name of your application.
 *
 * Examples:
 *
 *     passport.use(new DataportenStrategy({
 *         clientID: 'xxx-xxx-xxx-xxx-xxx',
 *         clientSecret: 'xxx-xxx-xxx-xxx-xxx-xxx'
 *         callbackURL: 'https://www.example.no/auth/dataporten/callback',
 *         userAgent: 'minapp.no'
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
	options = options || {};
	options.authorizationURL = options.authorizationURL || 'https://auth.dataporten.no/oauth/authorization';
	options.tokenURL = options.tokenURL || 'https://auth.dataporten.no/oauth/token';
	options.scopeSeparator = options.scopeSeparator || ',';
	options.customHeaders = options.customHeaders || {};

	if (!options.customHeaders['User-Agent']) {
		options.customHeaders['User-Agent'] = options.userAgent || 'passport-uninett-dataporten';
	}

	OAuth2Strategy.call(this, options, verify);
	this.name = 'dataporten';
	this.client_id = options.clientID;
	this._userProfileURL = options.userProfileURL || 'https://auth.dataporten.no/userinfo';
	this._oauth2.useAuthorizationHeaderforGET(true);

	var self = this;
	var _oauth2_getOAuthAccessToken = this._oauth2.getOAuthAccessToken;
	this._oauth2.getOAuthAccessToken = function (code, params, callback) {
		_oauth2_getOAuthAccessToken.call(self._oauth2, code, params, function (err, accessToken, refreshToken, params) {
			if (err) {
				return callback(err);
			}
			if (!accessToken) {
				return callback({
					statusCode: 400,
					data: JSON.stringify(params)
				});
			}
			callback(null, accessToken, refreshToken, params);
		});
	}
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from Dataporten.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `dataporten`
 *   - `id`               the user's Dataporten ID
 *   - `username`         the user's Dataporten (feide) username (if in scope)
 *   - `displayName`      the user's full name
 *   - `photos`           the URL of to the user's profile photos (if available)
 *   - `emails`           the user's email addresses
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function (accessToken, done) {
	var self = this;
	this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
		var json;

		if (err) {
			if (err.data) {
				try {
					json = JSON.parse(err.data);
				} catch (_) {
				}
			}

			if (json && json.message) {
				return done(new APIError(json.message));
			}
			return done(new InternalOAuthError('Failed to fetch user profile', err));
		}

		try {
			json = JSON.parse(body);
		} catch (ex) {
			return done(new Error('Failed to parse user profile'));
		}

		if (json.audience !== self.client_id) {
			return done(new Error("Audience does not match client_id."));
		}

		log_file.write(body);

		var profile = Profile.parse(json);
		profile.provider = 'dataporten';
		profile._raw = body;
		profile._json = json;

		done(null, profile);

	});
}


// Expose constructor.
module.exports = Strategy;
