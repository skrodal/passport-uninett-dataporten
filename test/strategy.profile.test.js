/* global describe, it, before, expect */
/* jshint expr: true */

var DataportenStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('fetched from default endpoint', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://auth.dataporten.no/userinfo') { return callback(new Error('wrong url argument')); }
      if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
      var body = '{"user": { "userid": "1", "userid_sec": ["feide:borson@olderdalen.no"], "name": "Bor Borson", "email": "bor.borson@olderdalen.no", "profilephoto": "photo.jpg" },"audience": "ABC123" }';
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('dataporten');
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('borson@olderdalen.no');
      expect(profile.displayName).to.equal('Bor Borson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0]).to.equal('bor.borson@olderdalen.no');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint
  
  describe('fetched from default endpoint and then fetching emails, where user has a publicly visible email address', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      scope: [ 'user:email' ]
    }, function() {});
  
    strategy._oauth2._request = function(method, url, headers, body, accessToken, callback) {
      var body;
      switch (url) {
      case 'https://auth.dataporten.no/userinfo':
        var body = '{"user": { "userid": "1", "userid_sec": ["feide:borson@olderdalen.no"], "name": "Bor Borson", "email": "bor.borson@olderdalen.no", "profilephoto": "photo.jpg" },"audience": "ABC123" }';
        break;
      default:
        return callback(new Error('wrong url argument'));
      }
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('dataporten');
      
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('borson@olderdalen.no');
      expect(profile.displayName).to.equal('Bor Borson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0]).to.equal('bor.borson@olderdalen.no');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint and then fetching emails, where user has a publicly visible email address
  
  describe('fetched from default endpoint and then fetching emails, where user does not have a publicly visible email address', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      scope: [ 'user:email' ]
    }, function() {});
  
    strategy._oauth2._request = function(method, url, headers, body, accessToken, callback) {
      var body;
      switch (url) {
      case 'https://auth.dataporten.no/userinfo':
        var body = '{"user": { "userid": "1", "userid_sec": ["feide:borson@olderdalen.no"], "name": "Bor Borson", "email": "bor.borson@olderdalen.no", "profilephoto": "photo.jpg" },"audience": "ABC123" }';
        break;
      default:
        return callback(new Error('wrong url argument'));
      }
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('dataporten');
      
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('borson@olderdalen.no');
      expect(profile.displayName).to.equal('Bor Borson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0]).to.equal('bor.borson@olderdalen.no');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint and then fetching emails, where user does not have a publicly visible email address
  
  describe('fetched from default endpoint and then fetching emails, where user does not have any publicly visible or privately available email addresses', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      scope: [ 'user:email' ]
    }, function() {});
  
    strategy._oauth2._request = function(method, url, headers, body, accessToken, callback) {
      var body;
      switch (url) {
      case 'https://auth.dataporten.no/userinfo':
        var body = '{"user": { "userid": "1", "userid_sec": ["feide:borson@olderdalen.no"], "name": "Bor Borson", "profilephoto": "photo.jpg" },"audience": "ABC123" }';
        break;
      default:
        return callback(new Error('wrong url argument'));
      }
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('dataporten');
      
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('borson@olderdalen.no');
      expect(profile.displayName).to.equal('Bor Borson');
      expect(profile.emails).to.be.undefined;
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint and then fetching emails, where user does not have any publicly visible or privately available email addresses
  
  describe('fetched from default endpoint and then fetching emails, where user has a publicly visible email address but user:email scope has not been granted', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      scope: [ 'user:email' ]
    }, function() {});
  
    strategy._oauth2._request = function(method, url, headers, body, accessToken, callback) {
      var body;
      switch (url) {
      case 'https://auth.dataporten.no/userinfo':
        var body = '{"user": { "userid": "1", "userid_sec": ["feide:borson@olderdalen.no"], "name": "Bor Borson", "email": "bor.borson@olderdalen.no", "profilephoto": "photo.jpg" },"audience": "ABC123" }';
        break;
      default:
        return callback(new Error('wrong url argument'));
      }
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('dataporten');
      
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('borson@olderdalen.no');
      expect(profile.displayName).to.equal('Bor Borson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0]).to.equal('bor.borson@olderdalen.no');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint and then fetching emails, where user has a publicly visible email address but user:email scope has not been granted
  
  describe('fetched from default endpoint and then fetching emails, where user has a publicly visible email address but emails response is malformed', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      scope: [ 'user:email' ]
    }, function() {});
  
    strategy._oauth2._request = function(method, url, headers, body, accessToken, callback) {
      var body;
      switch (url) {
      case 'https://auth.dataporten.no/userinfo':
        var body = '{"user": { "userid": "1", "userid_sec": ["feide:borson@olderdalen.no"], "name": "Bor Borson", "email": "bor.borson@olderdalen.no", "profilephoto": "photo.jpg" },"audience": "ABC123" }';
        break;
      default:
        return callback(new Error('wrong url argument'));
      }
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('dataporten');
      
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('borson@olderdalen.no');
      expect(profile.displayName).to.equal('Bor Borson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0]).to.equal('bor.borson@olderdalen.no');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint and then fetching emails, where user has a publicly visible email address but emails response is malformed
  
  describe('fetched from custom endpoint', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      userProfileURL: 'https://auth.dataporten.no/userinfo'
    }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://auth.dataporten.no/userinfo') { return callback(new Error('wrong url argument')); }
      if (accessToken != 'token') { return callback(new Error('wrong token argument')); }

      var body = '{"user": { "userid": "1", "userid_sec": ["feide:borson@olderdalen.no"], "name": "Bor Borson", "email": "bor.borson@olderdalen.no", "profilephoto": "photo.jpg" },"audience": "ABC123" }';
      callback(null, body, undefined);
    };
    
    
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('dataporten');
      
      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('borson@olderdalen.no');
      expect(profile.displayName).to.equal('Bor Borson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0]).to.equal('bor.borson@olderdalen.no');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  });
  
  describe('error caused by invalid token', function() {
    var strategy =  new DataportenStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      var body = '{"message":"Bad credentials","documentation_url":"https://docs.dataporten.no"}';
      callback({ statusCode: 400, data: body });
    };
      
    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('APIError');
      expect(err.message).to.equal('Bad credentials');
    });
  }); // error caused by invalid token
  
  describe('error caused by malformed response', function() {
    var strategy =  new DataportenStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      var body = 'Hello, world.';
      callback(null, body, undefined);
    };
      
    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Failed to parse user profile');
    });
  }); // error caused by malformed response
  
  describe('internal error', function() {
    var strategy =  new DataportenStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
  
    strategy._oauth2.get = function(url, accessToken, callback) {
      return callback(new Error('something went wrong'));
    }
    
    
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('wrong-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
    
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });
    
    it('should not load profile', function() {
      expect(profile).to.be.undefined;
    });
  }); // internal error
  
});
