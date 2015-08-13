/**
 * Created by donghoon on 15. 8. 13..
 */

angular.module('starter.services.messageService', [])

    .factory('Message', ['$http', function ($http) {

        return {
            getStatus: $http.get('http://cors-test.appspot.com/test')
                .success(function (resp) {
                    console.log("Success", resp);
                    console.log("Success", resp.status);
                    //console.log("Success", resp.statusText);
                    //console.log("Success", resp.config);
                    //console.log("Success", resp.data);
                    //console.log("Success", resp.data.status);
                    //$scope.conditions = resp.data.status;
                    return resp.status;
                })
                .error(function (err) {
                    console.error('ERR', err);
                    $scope.conditions = err;
                    // err.status will contain the status code
                }),
            getForecast: $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json')
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                })
        };
    }]);
