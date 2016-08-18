
/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function (json) {

	if ('string' == typeof json) {
		json = JSON.parse(json);
	}

	var profile = {};
	profile.id = String(json.user.userid);
	profile.displayName = json.user.name;

	// Check if Feide username is included
	if (json.user.userid_sec instanceof Array) {
		if (json.user.userid_sec[0].indexOf('feide:') !== -1) {
			profile.username = json.user.userid_sec[0].replace('feide:', '');
		}
	}

	// Check if email is included
	if (json.user.email) {
		profile.emails = [{value: json.user.email}];		
	}

	// Check if profile photo is included
	if (json.user.profilephoto) {
		profile.photos = [{value: 'https://api.dataporten.no/userinfo/v1/user/media/' + json.user.profilephoto}];
	}

	return profile;
};