app.controller('loggerCtrl', ['$scope', '$http', function ($scope, $http) {
	 /* 分页功能的实现 */
    $scope.pageSize = 10;// 分页显示记录数
	$scope.currentPage = 1;// 默认当前页为第一页
	$scope.totalPage = 0;// 总的页数
	$scope.totalCount = 0;// 记录的总数
	
    /**
	 * 获得日志所有信息的方法
	 */
	$scope.allLogger = function (pageNum) {
		if($scope.totalPage != 0 && (pageNum < 1 || pageNum > $scope.totalPage)){
			return pageNum;
		}
        $http.get('http://localhost:8080/sy/logger/all', {params:{"currentPage":pageNum,"pageSize":$scope.pageSize}})
            .success(function (data) {
                if (data.data.total == 0) {
                    $scope.data = "";
                    $scope.isShow = false;
                } else {
                	$scope.isShow = true;
                	$scope.totalCount = data.data.total;// 总记录数
                	$scope.totalPage = Math.ceil( $scope.totalCount / $scope.pageSize);// 总页数
                    $scope.data = data.data.documents;// 要展示的数据
                    $scope.currentPage = pageNum;// 更新当前页码
                    // 分页导航栏显示的可选数字(页码)
                    $scope.paging = new Array();
                    // 显示分页导航栏的中间数字(页码)
                    var begin;// 当前分页导航栏的第一个数字(页码)
                    var end;// 当前分页导航栏的最后一个数字(页码)
                    begin = $scope.currentPage - 4;
                    if(begin < 1) { // begin不能小于1
                        begin = 1;
                    }
                    // 显示8个页码，理论上end 是 begin + 7
                    end = begin + 7;
                    if(end > $scope.totalPage) {
                        // 最后一页不能大于总页数
                        end = $scope.totalPage;
                    }
                    // 修正begin 的值, 理论上 begin 是 end - 7
                    begin = end - 7;
                    if(begin < 1) { // begin不能小于1
                        begin = 1;
                    }
                    // 将页码加入 PageList集合
                    for(var i = begin; i <= end; i++) {
                        $scope.paging.push(i);
                    }
                }
            }).error(function (err) {
            	alert(err.error);
        });
    }

	/**
	 * 点击上一页时
	 */
	$scope.previous = function() {
		$scope.allLogger($scope.currentPage - 1);
	}
	
	/**
	 * 点击数字页时
	 */
	$scope.current = function(page) {
		$scope.allLogger(page);
	}
	
	/**
	 * 点击下一页时
	 */
	$scope.next = function() {
		$scope.allLogger(++$scope.currentPage);
	}
	
	// 判断是否是当前页
    $scope.isActivePage = function(page) {
        return page === $scope.currentPage;
    }
    
	$scope.allLogger($scope.currentPage);// 初始化页面
}]);