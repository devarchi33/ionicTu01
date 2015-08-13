angular.module('starter.controllers', ['starter.controllers.messageController', 'starter.controllers.configController', 'starter.controllers.chatController'])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ContactCtrl', function ($scope) {
        $scope.name = "skyfly33";
    })
;
