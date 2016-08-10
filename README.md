# Failed

Fail to do backgroundGeolocation.start just after
backgroundGeolocation.configure.

## Problem

Need to call backgroundGeolocation.start inside a 1000 timeout. See [lines of code](https://github.com/sekiroh/background-geolocation-test/blob/failedconfigure/www/js/app.js#L68-L82)

## Log results:

```text
[2016/08/10 12:34:25] BackgroundGeolocationPlugin:Attempt to start unconfigured service
[2016/08/10 12:34:25] BackgroundGeolocationPlugin:Location services enabled check
[2016/08/10 12:34:25] BackgroundGeolocationPlugin:initializing plugin
```
