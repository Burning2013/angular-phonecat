'use strict';
angular.module('phoneTodo').
  controller('myCtrl', function ($scope) {
    $scope.value = ""
    $scope.todos = [
      {
        content: 'Code with angularjs!',
        timestamp: 1,
        done: true
      },
      {
        content: 'Read finance.',
        timestamp: 21,
        done: false
      }
    ]

    $scope.$watch('todos', function (newValue) { 
      $scope.dones = newValue.filter(item => item.done)
    }, true)
    
    $scope.add = function () { 
      console.log('handleAdd...', $scope.value)
      if(!$scope.value) return false
      $scope.todos.push({ content: $scope.value, timestamp: Date.now(), done: false })
      $scope.value = ''
    }

    $scope.remove = function (index) { 
      $scope.todos.splice(index, 1)
    }

    $scope.doneSwitch = function ($event, record, index) {
      const checked = $event.target.checked
      $scope.todos.splice(index, 1, { ...record, done: checked })
    }

    $scope.clear = function () {
      $scope.todos = []
    }
  }).
  // component是默认自带隔离作用域的
  component('phoneTodo', {
    // 每个组件都拥有自己的controller控制器用于定义组件需要的数据、方法
    // 当controller值为字符串时就会从应用中查找与字符串同名的构造函数作为自己的控制器函数
    templateUrl: 'phone-todo/phone-todo.template.html',
    controller: 'myCtrl'
  })