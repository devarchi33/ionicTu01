/**
 * Created by donghoon on 15. 8. 13..
 */

angular.module('starter.controllers.configController', [])

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
    });