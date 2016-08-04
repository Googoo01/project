 'use strict';
 
 /* Controllers */

var listData = angular.module('list', []);

listData.controller('listCtrl', function($scope) {
  $scope.commentLst = [
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'用户评价列表用户评价列表用户评价列户评价列表用户评价列表用户评价列表',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'2用户评价列表用户评',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'3用户评价列表用表',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'4用户评价列表用表',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'}
  ];
  
  $scope.expertLst = [
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'专家记录列表列表专家记录列表列表专家记录列表列表',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'2专家记录列表列表',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'3专家记录列表列表专家记录列记录列表列表',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'4专家记录列表列表专家记录列表列列表列表',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'}
  ];

  $scope.picLst = [
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'相关截图相关截图相关截图相关截图相关截图相关截图相关截图相关截图相关截图',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'2相关截图相关截图相关截图',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'3相关截图相关截图相关截图相关截图',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'},
    {'avatar':'imgs/head.png',
      'usrNm': '花花公子',
      'usrLink':'http://3g.cnfol.com',
      'comment':'4相关截图相关截图相关截图相关截图',
      'commentLnk':'http://q.3g.cnfol.com/',
      'time': '14:23:20'}
  ];
});