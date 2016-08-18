# passport-uninett-dataporten

[Passport](http://passportjs.org/) strategy for authenticating with 
[Dataporten](https://docs.dataporten.no/) using the OAuth 2.0 API.

This module lets you authenticate using Dataporten in your Node.js 
applications.

By plugging into Passport, Dataporten authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
$ npm install skrodal/passport-uninett-dataporten
```

## Usage

#### Create an Application

Before using `passport-uninett-dataporten`, you must register an application 
with [Dataporten](https://dashboard.dataporten.no/).

Your application will be issued a client ID and client secret, which need 
to be provided to the strategy.  You will also need to configure a callback 
URL which matches the route in your application.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

