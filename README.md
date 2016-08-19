# passport-uninett-dataporten

[Passport](http://passportjs.org/) strategy for authenticating with 
[Dataporten](https://docs.dataporten.no/) using the OAuth 2.0 API.

This module lets you authenticate using Dataporten in your Node.js 
applications.

By plugging into Passport, Dataporten authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

Note to self: tested and working.

## Install

```bash
$ npm install skrodal/passport-uninett-dataporten
```

### Demo/usage

An example of this strategy's usage may be observed in the [NodeBB OAuth Plugin for UNINETT Dataporten](https://github.com/skrodal/nodebb-plugin-sso-dataporten)

### Create an Application

Before using `passport-uninett-dataporten`, you must register an application 
with [Dataporten](https://dashboard.dataporten.no/).

Your application will be issued a client ID and client secret, which need 
to be provided to the strategy.  You will also need to configure a callback 
URL which matches the route in your application.

The strategy will translate (normalise) userinfo from the following scopes:

- `userid` from scope `userid`
- `email` from scope `email` 
- `name` and `profilephoto` from scope `profile`
- `userid_sec` from scope `userid-feide`

Note that `groups` is not included.

### User Profile

Dataporten's /userinfo enpoint will return something like this:

```json
{
  "user": {
    "userid_sec": ["bor@uninett.no"],
    "userid": "b45cad4b-8fb4-498e-b81d-8eb179a2qff2",
    "name": "Bør Børson",
    "email": "bor.borson@uninett.no",
    "profilephoto": "p:002a12b5-e0d4-2dcb-acda-2f999a23ny4c"
  },
  "audience": "d00b11d5-aa23-2277-185f-2d6a0dbcbc02"
}
```

...which this Strategy will translate to this:


```json
{
  "id": "b45cad4b-8fb4-498e-b81d-8eb179a2qff2",
  "username": "bor@uninett.no",
  "displayName": "Bør Børson",
  "provider": "dataporten",
  "emails": [
    {
      "value": "bor.borson@uninett.no"
    }
  ],
  "photos": [
    {
      "value": "https://api.dataporten.no/userinfo/v1/user/media/p:002a12b5-e0d4-2dcb-acda-2f999a23ny4c"
    }
  ]
}
```

If the client does not have access to a required scope (e.g. `userid-feide`), the corresponding profile attribute (e.g. `username`) will of course not be present.


## License

[The MIT License](http://opensource.org/licenses/MIT)