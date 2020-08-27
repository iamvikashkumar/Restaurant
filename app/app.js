var app = angular.module('Restaurant', []);

app.controller('MainRestaurantCtrl', function($scope, $http, $filter) {

    $scope.order = false;
    $scope.foodName = null;
    $scope.image= null;
    $scope.price = null;
    $scope.time= null;
    $scope.type = null;
    $scope.item = null;
    $scope.allowToSubmit = false;
    $scope.disableSave = false;
    $scope.category = ["Starter", "Breakfast", "Salads", "Meal", "Beverage"];
    $scope.foodType = ["Veg", "Non-Veg"];
    $scope.sort = ["Price:Low-to-High", "Price:High-to-Low", "Time:Low-to-High", "Time:High-to-Low"];
    $scope.timeToServe = ["10 Mins", "20 Mins", "30 Mins", "45 Mins", "60 Mins", "90 Mins"];

    $scope.noOfUnit = function(value, data) {
        if(value == '+' && data.unit < 10) {
            data.unit = data.unit + 1; 
        } else if(value == '-' && data.unit > 0) {
            data.unit = data.unit - 1;
        }
    };

    $http.get('/data').success(function(data) {
        $scope.data= data;
        angular.forEach($scope.data, function(value) {
            value.unit = 0;
        });
        $scope.mainData = angular.copy($scope.data);
        filteredOptionData($scope.data);
    });

    $scope.showOrder= function () {
        $scope.subTotal = 0;
        $scope.myOrder = [];
        angular.forEach($scope.data, function(value) {
            if(value.unit > 0) {
                $scope.subTotal += value.unit * value.price;
                $scope.myOrder.push(value);
            }
        });
        if($scope.myOrder.length > 0) {
            $scope.order = !$scope.order;
        } else {
            alert("Hello\nYour have not selected any Item..!! \n Please Select and Order.");
        }  
    };

    function filteredOptionData (allData) {
      $scope.filteredArray = ["All"];
      $scope.filteredOption = [{"name":"All", "image" : "All.png"}];
      angular.forEach(allData, function(value) {
        if(!$scope.filteredArray.includes(value.category)) {
            $scope.filteredArray.push(value.category);
            var data = {};
            data.name = value.category;
            data.image = value.category.concat('.png');
            $scope.filteredOption.push(data);
        }
      });
    }

    $scope.filterSelected = function(filterBy) {
        $scope.data = $scope.mainData;
        $scope.filteredData = [];
        if(filterBy.name == 'All') {
            return;    
        } else {
            angular.forEach($scope.data, function(value) {
                if(value.category == filterBy.name) {
                    $scope.filteredData.push(value);
                }
            });
        }        
        $scope.data = $scope.filteredData;
    };

    $scope.filterType = function(type) {
        if(type == 'Non-Veg') {
            $scope.type = "SORT";
            $scope.data = [];
            angular.forEach($scope.mainData, function(value) {
                if(value.type == 'Non-Veg') {
                    $scope.data.push(value);
                }
            });
        } else if(type== 'Veg') {
            $scope.type = "SORT";
            $scope.data = [];
            angular.forEach($scope.mainData, function(value) {
                if(value.type == 'Veg') {
                    $scope.data.push(value);
                }
            });
        } else {
            $scope.type = "SORT";
            $scope.data = $scope.mainData;
        }
    };

    $scope.sortBasedOnTimeOrType = function(type) {
        console.log("vikash", type, $scope.data);
        if(type === 'Price:Low-to-High') {
            $scope.data = $filter('orderBy')($scope.data, 'price', false);
        } else if (type === 'Price:High-to-Low') {
            $scope.data = $filter('orderBy')($scope.data, 'price', true);
        } else if(type === 'Time:Low-to-High') {
            $scope.data = $filter('orderBy')($scope.data, 'time_to_serve', false);
        } else if (type === 'Time:High-to-Low'){
            $scope.data = $filter('orderBy')($scope.data, 'time_to_serve', true);
        }
    };
      
    $scope.checkForDuplicateEntry = function (foodName) {
        $scope.sameProduct = 0;
        angular.forEach($scope.data, function(singleData) {
            if(singleData.name.toUpperCase() === foodName.toUpperCase()) {
                $scope.sameProduct += 1;
                alert("Iteam/Food is already Stored, Add some new Food.", singleData.name);
                return;
            }
        });
        if ($scope.sameProduct === 0 && $scope.foodName !== null && $scope.image!== null &&
            $scope.price !== null && $scope.time!== null &&
            $scope.type !== null && $scope.item!== null) {
            $scope.allowToSubmit = true;
            $scope.disableSave = true;
        } else {
            alert("All fields need to be filled.");
        }
    };

});
