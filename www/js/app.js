var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('MainCtrl', function($ionicPlatform, $q, $scope) {
  var $this = this;
  $this.locations = [];
  $this.isRunning = false;
  $this.locationActivated = true;

  $ionicPlatform.ready(function() {

    $this.checkAndStartGps = function() {
      $this.checkGeoLocation()
        .then(function() { $this.locationActivated = true;
                           $this.startGps(); })
        .catch(function() { $this.locationActivated = false; });
    };

    $this.checkGeoLocation = function() {
      var defer = $q.defer();
      backgroundGeolocation.isLocationEnabled(function(enable) {
        if (!enable) { return defer.reject(); }
        else { return defer.resolve() ;}
      });
      return defer.promise;
    };

    $this.startGps = function() {
      $this.isRunning = true;
      $this.locations = [];
      var callback = function(location) {
        console.log(location);
        $scope.$apply(function() { $this.locations.push(location); });
        backgroundGeolocation.finish();
      };
      var failure = function() {
        console.error('Failed to get location');
      };

      var config = { desiredAccuracy: 100,
                     stationaryRadius: 1,
                     distanceFilter: 1,
                     interval: 10*1000,
                     stopOnTerminate: false,
                     activityType: 'AutomotiveNavigation',
                     debug: true };

      backgroundGeolocation.configure(callback, failure, config);

      // Have to wait a bit before starting, else it throws an init problem
      setTimeout(function() {
        backgroundGeolocation.start(
          function() { console.log('Start successful'); },
          function() { console.log('Start failed');
                       $this.isRunning = false; }
        );}, 1000);
    };

    $this.stopGps = function() {
      backgroundGeolocation.stop();
      $this.isRunning = false;
    };
  });
});
