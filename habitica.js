var habitica = angular.module('habitica', ['ApiService']);
habitica.controller('HabiticaController', function($scope, $http, api) {

  $scope.users = {
    'Emily':{
      "name":"Emily",
      authHeaders:{
        'x-api-user':'51239233-6d46-4c35-9eb5-b335e940185f',
        'x-api-key':'f9e96217-459d-4476-b300-3c7f90becdc7'
      }
    },
    'Ryan':{
      "name":"Ryan",
      authHeaders:{
        'x-api-user':'33428a26-c2db-4abe-817d-cb4a7386c8e6',
        'x-api-key':'ae1ac590-cb5d-45aa-823e-e8b14917c14d'
      }
    }
  };

  $scope.RefreshUser  = function(user){
    api.GetUser(user.authHeaders).then(function(data){
      $scope.users[user.name].account = {};
      $scope.users[user.name].account = data;
    });
    api.GetTasks("habits", user.authHeaders).then(function(data){
      $scope.users[user.name].habits = {};
      $scope.users[user.name].habits = data;
    });
    api.GetTasks("todos",user.authHeaders).then(function(data){
      $scope.users[user.name].todos = {};
      $scope.users[user.name].todos = data;
    });
    api.GetTasks("rewards",user.authHeaders).then(function(data){
      $scope.users[user.name].rewards = {};
      $scope.users[user.name].rewards = data;
    });
  }
  //Initialize character data from Habitica API
  angular.forEach($scope.users, function(user){
    $scope.RefreshUser(user);
  });

  //Perform action on tasks and update
  $scope.action = function(taskid, action, user){
    api.TaskAction(taskid, action, $scope.users[user].authHeaders).then(function(){
      $scope.RefreshUser($scope.users[user]);
    });
  }

});