/**
 * Created by donghoon on 15. 8. 17..
 */

angular.module('starter.services.pushService', [])

    .factory('Push', function ($q) {
        var ready = $q.defer();

        ionic.Platform.ready(function (device) {
            ready.resolve(device);
        });

        return {
            ready: ready.promise
        };
    });