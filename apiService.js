angular.module('ApiService', [])
.service('api', function($http) {
  this.GetUser = function(authHeaders){
    var baseUrl = 'https://habitica.com/api/v3/';
    var inParams = {};
    var inData = {};
    var command = "user"
    return $http({method:"GET",url:baseUrl+command,params:inParams,data:inData,headers:authHeaders})
    .then(function (response){
      return response.data.data;
    });
  };
  this.GetTasks = function(filter, authHeaders){
    var baseUrl = 'https://habitica.com/api/v3/';
    if (filter){
      var inParams = {type:filter};
    }
    var inData = {};
    var command = "tasks/user";
    return $http({method:"GET",url:baseUrl+command,params:inParams,data:inData,headers:authHeaders})
    .then(function (response){
      return response.data.data;
    });
  };
  this.TaskAction = function(taskid, command, authHeaders){
    var baseUrl = 'https://habitica.com/api/v4/tasks/';
    var inParams = {};
    var inData = {};
    return $http({method:"POST",url:baseUrl+taskid+"/score/"+command,params:inParams,data:inData,headers:authHeaders})
    .then(function (response){
      return response.data.data;
    });
  };

});