/**
 * Created by donghoon on 15. 8. 14..
 */

angular.module('starter.controllers.dashController', [])

    .controller('DashCtrl', function ($scope, $cordovaActionSheet) {

        var options = {
            title: 'What do you want with this image?',
            buttonLabels: ['Share via Facebook', 'Share via Twitter'],
            addCancelButtonWithLabel: 'Cancel',
            androidEnableCancelButton: true,
            addDestructiveButtonWithLabel: 'Delete it'
        };

        document.addEventListener("deviceready", function () {

            $cordovaActionSheet.show(options)
                .then(function (btnIndex) {
                    var index = btnIndex;
                });
        }, false);

        $scope.name = "skyfly33";
    })