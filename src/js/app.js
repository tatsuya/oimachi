'use strict';

var app = angular.module('app', ['ngResource']);

app.factory('Items', ['$resource', function($resource) {
  return $resource('items.json');
}]);

app.controller('ListCtrl', ['$scope', 'Items', function($scope, Items) {

  var sortByName = function(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;      
    }
    return 0;
  };

  var sortItems = function(items) {
    return items.sort(sortByName);
  };

  var sortTags = function(items) {
    return items.map(function(item) {
      if (!Array.isArray(item.tags)) return item;
      item.tags.sort();
      return item;
    })
  };

  Items.query().$promise.then(function(items) {
    $scope.items = sortTags(sortItems(items));
  });

  $scope.searchByTag = function(tag) {
    if ($scope.search === tag) {
      $scope.search = null;
    } else {
      $scope.search = tag;
    }
  };

}]);
