/**
 * Created by donghoon on 15. 8. 14..
 */

angular.module('starter.controllers.pluginController', [])

    .controller('PluginCtrl', ['$scope', '$ionicActionSheet', '$cordovaPush', '$cordovaDialogs', '$cordovaMedia', '$cordovaToast', 'Push', '$http', '$ionicPlatform',
        function ($scope, $ionicActionSheet, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, Push, $http, $ionicPlatform) {
            $scope.pluginWord = "Push!";

            $scope.showActionSheet = function () {
                $ionicActionSheet.show({
                    titleText: 'ActionSheet Example',
                    destructiveText: 'Delete',
                    cancelText: 'Cancel',
                    cancel: function () {
                        console.log('Canceled');
                    },
                    buttons: [
                        {text: 'Share'},
                        {text: '<i class="icon ion-arrow-move"></i> Move'},
                    ],
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0 :
                                //Handle Share Button
                                return true;
                            case 1 :
                                //Handle Move Button
                                return true;
                        }
                    }
                });
            };

            $scope.notifications = [];

            Push.ready.then(function (device) {
                $scope.register();
            });

            $scope.register = function () {
                $cordovaDialogs.alert("Register Click!");
                console.log("register button clicked");
                console.log(ionic.Platform);
                console.log(ionic.Platform.device());

                var config = {};

                if (ionic.Platform.isAndroid()) {
                    config = {
                        "senderID": "627833707210",
                        "ecb": "angular.element(document.body).injector().get('$cordovaPush').onNotification"
                    };
                }
                else if (ionic.Platform.isIOS()) {
                    config = {
                        "badge": true,
                        "sound": true,
                        "alert": true,
                        "ecb": "angular.element(document.body).injector().get('$cordovaPush').onNotification"
                    }
                }

                //document.addEventListener("deviceready", function () { // Note: ues this code to remove TypeError: Cannot read property 'pushNotification' of undefined but now it work!
                $cordovaPush.register(config).then(function (result) {
                    console.log("Register Success : " + result);

                    $cordovaDialogs.alert("This Platform is " + ionic.Platform.device());
                    $cordovaToast.showShortCenter('Registered for push notifications');
                    $scope.registerDisabled = true;
                    if (ionic.Platform.isIOS()) {
                        $scope.regId = result;
                        storeDeviceToken("ios");
                    }
                }, function (err) {
                    console.log("Register error : " + err);
                });
                //});
            };

            $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                console.log(JSON.stringify([notification]));
                $cordovaDialogs.alert("notification : " + notification);
                if (ionic.Platform.isAndroid()) {
                    $cordovaDialogs.alert("This Platform is Android");
                    handleAndroid(notification);
                }
                else if (ionic.Platform.isIOS()) {
                    $cordovaDialogs.alert("This Platform is IOS");
                    handleIOS(notification);
                    $scope.$apply(function () {
                        $scope.notifications.push(JSON.stringify(notification.alert));
                    })
                }
            });

            function handleAndroid(notification) {
                console.log("In foreground " + notification.foreground + " Coldstart " + notification.coldstart);
                $cordovaDialogs.alert("This Notification Event is " + notification.event);
                if (notification.event == "registered") {
                    $cordovaDialogs.alert("This regId is " + notification.regid);
                    $scope.regId = notification.regid;
                    storeDeviceToken("android");
                }
                else if (notification.event == "message") {
                    $cordovaDialogs.alert(notification.message, "Push Notification Received");
                    $scope.$apply(function () {
                        $scope.notifications.push(JSON.stringify(notification.message));
                    });
                }
                else if (notification.event == "error") {
                    $cordovaDialogs.alert(notification.msg, "Push Notification error event");
                }
                else {
                    $cordovaDialogs.alert(notification.event, "Push Notification Handler = Unprocessed Event")
                }
            }

            function handleIOS(notification) {
                if (notification.foreground == "1") {
                    if (notification.sound) {
                        var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                        mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
                    }

                    if (notification.body && notification.messageFrom) {
                        $cordovaDialogs.alert(notification.body, notification.messageFrom);
                    }
                    else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

                    if (notification.badge) {
                        $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                            console.log("Set badge success " + result)
                        }, function (err) {
                            console.log("Set badge error " + err)
                        });
                    }
                }
                else {
                    if (notification.body && notification.messageFrom) {
                        $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
                    }
                    else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
                }
            }

            function storeDeviceToken(type) {
                $cordovaDialogs.alert("Inside store PushToken");
                var user = {
                    user: 'user' + Math.floor((Math.random() * 10000000) + 1),
                    type: type,
                    token: $scope.regId
                };
                console.log("Post token for registered device with data " + JSON.stringify(user));

                $http.post('http://localhost:8000/subscribe', JSON.stringify(user))
                    .success(function (data, status) {
                        $cordovaDialogs.alert("store Success " + data + " " + status);
                        console.log("Token stored, device is successfully subscribed to receive push notifications.");
                    })
                    .error(function (data, status) {
                        $cordovaDialogs.alert("store Error " + data + " " + status);
                        console.log("Error storing device token." + data + " " + status)
                    }
                );
            }

            function removeDeviceToken() {
                var tkn = {"token": $scope.regId};
                $http.post('http://localhost:8000/unsubscribe', JSON.stringify(tkn))
                    .success(function (data, status) {
                        console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
                    })
                    .error(function (data, status) {
                        console.log("Error removing device token." + data + " " + status)
                    }
                );
            }

            $scope.unregister = function () {
                console.log("Unregister called");
                removeDeviceToken();
                $scope.registerDisabled = false;
            };
        }]);