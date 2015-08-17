/**
 * Created by donghoon on 15. 8. 14..
 */

angular.module('starter.controllers.pluginController', [])

    .controller('PluginCtrl', ['$scope', '$ionicActionSheet', '$cordovaPush', '$cordovaDialogs', '$cordovaMedia', '$cordovaToast', 'Push', '$http',
        function ($scope, $ionicActionSheet, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, Push, $http) {
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



        }]);