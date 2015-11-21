var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngResource', 'ngSanitize']).value('nickName', 'anonymous');

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
    .when('/chatRoom', {
      controller: 'chatRoomController',
      templateUrl: '../views/partials/chatRoom.html',
      // access: { restricted: true },
    })
    .otherwise({
      redirectTo: '/'
    });
});
