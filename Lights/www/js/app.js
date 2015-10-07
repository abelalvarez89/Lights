// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
  .controller('LightsController', function() {
    var vm = this;
    vm.uploadToDropbox = function() {

      //alert('hello world ' + vm.airplaneMode);


      var client = new Dropbox.Client({
        key: '',
        secret: '',
        token: ''
      });

      function doHelloWorld() {
        var output = '1';
        if(vm.switch){
          output = '0';
        }
        client.writeFile('lights.txt', output, function(error) {
          if (error) {
            alert('Error: ' + error);
          }
        });
      }

      // Try to complete OAuth flow.
      client.authenticate({
        interactive: false
      }, function(error, client) {
        if (error) {
          alert('Error: ' + error);
        }
      });

      if (client.isAuthenticated()) {
        doHelloWorld();
      }

      document.getElementById('writeButton').onclick = function() {
        client.authenticate(function(error, client) {
          if (error) {
            alert('Error: ' + error);
          } else {
            doHelloWorld();
          }
        });
      }

    }
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})