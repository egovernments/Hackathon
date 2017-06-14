// AngularJS App Initialization
var app = angular.module('nagariyaApp', ['ngRoute', 'firebase']);

// Firebase References
var database = firebase.database();
var databaseRef = database.ref();

// Routes
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.
  when('/login', {
    templateUrl: 'templates/login.html',
		controller: 'LoginController'
  }).
  when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  }).
  when('/profile', {
    templateUrl: 'templates/profile.html',
    controller: 'ProfileController'
  }).
  when('/cleanmycity', {
    templateUrl: 'templates/services/cleanmycity.html',
    controller: 'CleanMyCityController'
  }).
  otherwise({
    redirectTo: '/login'
  });

}]);

// Controllers
// Login Controller
app.controller('LoginController', function($scope, $rootScope, $window) {

  $scope.signInWithGoogle = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      $rootScope.loggedUser = user;

      writeUserData(user.uid,
        user.displayName,
        user.email,
        user.photoURL);

      $window.location.assign('#/home');
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;

      alert(errorMessage);
    });
  };

});

// Home Controller
app.controller('HomeController', function($scope) {

  $scope.loggedUser = firebase.auth().currentUser;

});

// Profile Controller
app.controller('ProfileController', function($scope) {

  $scope.loggedUser = firebase.auth().currentUser;

});

// Clean My City Controller
app.controller('CleanMyCityController', function($scope) {

  $scope.loggedUser = firebase.auth().currentUser;

  $scope.openDialog = function() {
    $('#spotfixmodal').modal('open');
  };

});

// App Logic
$(".button-collapse").sideNav();

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    display_name: name,
    email: email,
    profile_picture : imageUrl,
    spot_fixes: 0,
    complaints: 0,
    points: 0
  });
}

$('.modal-trigger').click(function(e){
  console.log('asdasd');
});
