// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

    .run(function ($ionicPlatform, $cordovaPush, $cordovaActionSheet) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            var androidConfig = {
                "senderID": "627833707210",
            };

            var options = {
                title: 'What do you want with this image?',
                buttonLabels: ['Share via Facebook', 'Share via Twitter'],
                addCancelButtonWithLabel: 'Cancel',
                androidEnableCancelButton: true,
                winphoneEnableCancelButton: true,
                addDestructiveButtonWithLabel: 'Delete it'
            };

            document.addEventListener("deviceready", function () {
                $cordovaPush.register(androidConfig).then(function (result) {
                    // Success
                    console.log("Register Success Result : " + result);
                    alert("Register Success Result : " + result);
                    $cordovaActionSheet.show(options)
                        .then(function (btnIndex) {
                            var index = btnIndex;
                        });
                }, function (err) {
                    // Error
                    console.log("Register Error Result : " + err);
                    alert("Register Error Result : " + result);
                });

                $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                    switch (notification.event) {
                        case 'registered':
                            if (notification.regid.length > 0) {
                                alert('registration ID = ' + notification.regid);
                            }
                            break;

                        case 'message':
                            // this is the actual push notification. its format depends on the data model from the push server
                            alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                            break;

                        case 'error':
                            alert('GCM error = ' + notification.msg);
                            break;

                        default:
                            alert('An unknown GCM event has occurred');
                            break;
                    }
                });


                // WARNING: dangerous to unregister (results in loss of tokenID)
                $cordovaPush.unregister(options).then(function (result) {
                    // Success!
                    console.log("Unregister Success Result : " + result);
                    alert("Unregister Success Result : " + result);
                }, function (err) {
                    // Error
                    console.log("Unregister Error Result : " + err);
                    alert("Unregister Error Result : " + err);
                });

            }, false);
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })

            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.config', {
                url: '/config',
                views: {
                    'tab-config': {
                        templateUrl: 'templates/tab-config.html',
                        controller: 'ConfigCtrl'
                    }
                }
            })

            .state('tab.contact', {
                url: '/contact',
                views: {
                    'tab-contact': {
                        templateUrl: 'templates/tab-contact.html',
                        controller: 'ContactCtrl'
                    }
                }
            })

            .state('tab.message', {
                url: '/message',
                views: {
                    'tab-message': {
                        templateUrl: 'templates/tab-message.html',
                        controller: 'MessageCtrl'
                    }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });
