angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('ConfigCtrl', function ($scope) {
        $scope.settingsList = [
            {
                text: "Message Off/On",
                checked: true,
            },
            {
                text: "Second Toggle!!",
                checked: false
            }
        ];
    })

    .controller('ContactCtrl', function ($scope) {
        $scope.name = "skyfly33";
    })

    .controller('MessageCtrl', function ($scope, $ionicSlideBoxDelegate) {
        $scope.message1 = "message1!!";
        $scope.message2 = "message2!!";
        $scope.messgeSections = [
            {
                messageCount: 1,
                date: new Date(),
                alertMessage: "Dummy Message1 Dummy Message1 Dummy Message1 Dummy Message1 Dummy Message1 Dummy Message1 Dummy Message1",
                profileImg: "img/mcfly.jpg",
                companyImg: "img/delorean.jpg"
            },
            {
                messageCount: 2,
                date: new Date(),
                alertMessage: "Dummy Message2 Dummy Message2 Dummy Message2 Dummy Message2 Dummy Message2 Dummy Message2 Dummy Message2",
                profileImg: "img/mcfly.jpg",
                companyImg: "img/delorean.jpg"
            }
        ];
    })
;
