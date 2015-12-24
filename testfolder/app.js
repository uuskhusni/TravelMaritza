/**
 * Created with JetBrains PhpStorm.
 * User: julisman
 * Date: 1/8/14
 * Time: 11:09 AM
 * http://blog.julisman.com
 * dynamic controller
 */


define([

], function () {
    var app = angular.module("app", ['ngRoute','ngAnimate','LocalStorageModule','angular-growl']);
    app.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $routeProvider.when('/:params',
            {
                template    : '<div data-ng-controller="controller" id="view"></div>',
                controller  : 'DynamicController'
            }
        ).when('/:params/:actions',
            {
                template    : '<div data-ng-controller="controller" id="view"></div>',
                controller  : 'DynamicController'
            }
        ).otherwise({ redirectTo: 'login' });
        $locationProvider.hashPrefix("!");
    }]);

    app.controller('DynamicController', function ($scope, $routeParams, $compile) {
        $scope.actions = $routeParams['actions'];
        $scope.controller = function(){};
        require([
            './core/controller/ctrl.' + $routeParams['params'],
            'text!./core/view/'  + $routeParams['params'] + '.html'
        ], function(controller, view){
                $scope.controller = controller;

                var v = angular.element("#view").html(view);
                $compile(v)(v.scope());
                $scope.$apply();
            }
        );
    });
    app.filter('temp', function($filter) {
        return function(input, precision) {
            if (!precision) {
                precision = 1;
            }
            var numberFilter = $filter('number');
            return numberFilter(input, precision) + '\u00B0C';
        };
    });
    app.directive('weatherIcon', function() {
        return {
            restrict: 'E', replace: true,
            scope: {
                cloudiness: '@'
            },
            controller: function($scope) {
                $scope.imgurl = function() {
                    var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                    if ($scope.cloudiness < 20) {

                        return baseUrl + 'sunny.png';
                    } else if ($scope.cloudiness < 90) {
                        return baseUrl + 'partly_cloudy.png';
                    } else {
                        return baseUrl + 'cloudy.png';
                    }
                };
            },
            template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
        };
    });
   app.baseUrlServer = 'http://localhost:8383/servermaritza/';
    return app;
});


