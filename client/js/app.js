var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'homeController',
      templateUrl: '../views/partials/home.html',
      access: { restricted: false },
    })
    .when('/signup', {
      controller: 'signUpController',
      templateUrl:'../views/partials/signup.html',
      access: { restricted: false },
    })
    .when('/user', {
      controller: 'userController',
      templateUrl: '../views/partials/user.html',
      // access: { restricted: true },
    })
    .otherwise({
      redirectTo: '/'
    });
});
