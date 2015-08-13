/**
 * Created by donghoon on 15. 8. 12..
 */

angular.module('starter.controllers.messageController', [])

    .controller('MessageCtrl', ['$scope', '$http', 'Message', function ($scope, $http, Message, $ionicSlideBoxDelegate) {
        $scope.message1 = "message1!!";
        $scope.message2 = "message2!!";

        $scope.messageSections = [
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
            },
            {
                messageCount: 3,
                date: new Date(),
                alertMessage: "Dummy Message3 Dummy Message3 Dummy Message3 Dummy Message3 Dummy Message3 Dummy Message3 Dummy Message3",
                profileImg: "img/mcfly.jpg",
                companyImg: "img/delorean.jpg"
            }
        ];

        Message.getStatus.success(function (data) {
            $scope.conditions = data.status;
        });

        Message.getForecast.success(function (data) {
            console.log("forecast : " + data);
            $scope.fiveDay = data;
        });
    }]);
