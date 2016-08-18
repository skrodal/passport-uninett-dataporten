/* global describe, it, before, expect */
/* jshint expr: true */

var Profile = require('../lib/profile');
var fs = require('fs');


describe('Profile.parse', function () {

	describe('profile obtained from Users documentation on 2016/02/02', function () {
		var profile;

		before(function (done) {
			fs.readFile('test/fixtures/borson.json', 'utf8', function (err, data) {
				if (err) {
					return done(err);
				}
				profile = Profile.parse(data);
				done();
			});
		});

		it('should parse profile', function () {
			expect(profile.id).to.equal('1');
			expect(profile.username).to.equal('borson@olderdalen.no');
			expect(profile.displayName).to.equal('Bor Borson');
			expect(profile.emails).to.have.length(1);
			expect(profile.emails[0]).to.equal('bor.borson@olderdalen.no');
			expect(profile.photos).to.have.length(1);
			expect(profile.photos[0]).to.equal('https://api.dataporten.no/userinfo/v1/user/media/photo.jpg');
		});
	});

	describe('profile obtained from Users documentation on 2016/02/02, with email attribute removed', function () {
		var profile;

		before(function (done) {
			fs.readFile('test/fixtures/borson-no-email.json', 'utf8', function (err, data) {
				if (err) {
					return done(err);
				}
				profile = Profile.parse(data);
				done();
			});
		});

		it('should parse profile', function () {
			expect(profile.id).to.equal('1');
			expect(profile.username).to.equal('borson@olderdalen.no');
			expect(profile.displayName).to.equal('Bor Borson');
			expect(profile.emails).to.be.undefined;
		});
	});

	describe('profile obtained from Users documentation on 2016/02/02, with photo_url attribute removed', function () {
		var profile;

		before(function (done) {
			fs.readFile('test/fixtures/borson-no-photo_url.json', 'utf8', function (err, data) {
				if (err) {
					return done(err);
				}
				profile = Profile.parse(data);
				done();
			});
		});

		it('should parse profile', function () {
			expect(profile.id).to.equal('1');
			expect(profile.username).to.equal('borson@olderdalen.no');
			expect(profile.displayName).to.equal('Bor Borson');
			expect(profile.photos).to.be.undefined;
		});
	});

})
;
