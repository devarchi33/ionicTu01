/**
 * Created by donghoon on 15. 8. 12..
 */

angular.module('starter.controllers.messasgeController', [])

    .controller('MessageCtrl', function ($scope, $ionicSlideBoxDelegate) {
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
            }
        ];
    });
