'use strict';

angular.module('vatValApp', []);

angular.module('vatValApp')
  .controller('resultCtrl', function($scope, $http) {

    // get current date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
    dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    $scope.today = mm + '/' + dd + '/' + yyyy;

    $scope.data={}; //point to an object.property
    // send request on submit button click
    $scope.fetch = function() {
      $http({
        method: 'GET',
        url: 'http://apilayer.net/api/validate?access_key=ed53ce4a421d063b6bd65407b60476dd&vat_number='+$scope.data.vat_number+''
      }).then(function success(response) {
        $scope.country = response.data.country_code;
        $scope.vat = response.data.vat_number;
        $scope.valid = response.data.valid;
        $scope.name = response.data.company_name;
        $scope.address = response.data.company_address;
        // if response is not made information is not visible
        if (response.status) {
          document.querySelector(".info").style.display = 'block';
        }
      });
    };
    // show fetched information
  });
