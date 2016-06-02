myApp.controller('SkillController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
 $scope.userName = '';
  // This happens after view/controller loads -- not ideal
  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
          getSkills();
      } else {
          $location.path("/home");
      }
  });

  $scope.currentSkill = {};
  $scope.skills = [];
  $scope.sortBy = '';


  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }

  $scope.submitSkill = function() {
    $scope.currentSkill.user = $scope.userName;
    console.log($scope.userName);
    $http.post('/skills', $scope.currentSkill).then(function(response) {
      console.log('skill submitted!');
      getSkills();
    });
  }

  function getSkills() {
    $http.get('/skills/' + $scope.userName)
    .then(function(response) {
      $scope.skills = response.data;
      console.log('got skill, man!');
    })
  }

}]);
