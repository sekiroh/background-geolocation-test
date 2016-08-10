# INSTALLATION

```sh
npm install cordova
cordova prepare
```

## GPS PROBLEM

Gps time is one hour before.

See [code1](https://github.com/sekiroh/background-geolocation-test/blob/gpstimestamp/www/js/app.js#L49-L69) and [code2](https://github.com/sekiroh/background-geolocation-test/blob/gpstimestamp/www/index.html#L41-L44).

Results is:

```test
Location from cordova-plugin-geolocation: 2016-08-10T17:03:40 +0200
Location from background-plugin: 2016-08-10T16:03:40 +02000
Location from Date.now(): 2016-08-10T17:03:40 +0200
```
