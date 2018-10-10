app.controller('monitorCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	$scope.monitorData = [
		{id:10000, name:'10秒'},
		{id:30000, name:'30秒'},
		{id:60000, name:'1分钟'},
		{id:300000, name:'5分钟'},
		{id:600000, name:'10分钟'},
	];
	var ws = null;
	$scope.proData = "";
	$scope.teamData = "";
	$scope.prodData = "";
	var n=0;
	function refresh() {
		if('WebSocket' in window){
			ws = new WebSocket("ws://localhost:8080/sy/refresh");
		} else {
			alert('Not support websocket')
		}
		ws.onopen = function(){
			send($scope.refreshTime==undefined?"10000":$scope.refreshTime+"");
		}
		ws.onmessage = function(msg){
			var data = JSON.parse(msg.data);
			$scope.proData = "";
			$scope.teamData = "";
			$scope.prodData = "";
			if(data.msg=="success"){
				$scope.number = n++;
				$scope.proData = data.data.project;
				$scope.teamData = data.data.team;
				$scope.prodData = data.data.product;
				$rootScope.$apply();
			} 
		}
		ws.onerror = function(err){
			console.log(err.error);
		}
		ws.onbeforeunload = function() {
			ws.close();
		}
	}
	function send(time){
		ws.send(time+"");
	}
	function closes() {
		ws.close();
	}
	$scope.queryByTime = function(){
		if(ws != null) closes();
		refresh();
	}
	$scope.queryByTime();
}]);