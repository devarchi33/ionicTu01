angular.module('starter.controllers', ['starter.controllers.messageController', 'starter.controllers.configController', 'starter.controllers.chatController'])

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
    })

    .controller('ContactCtrl', function ($scope) {
        $scope.name = "skyfly33";
    })
;
