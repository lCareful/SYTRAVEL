app.controller('classesCtrl', ['$scope', '$http', function ($scope, $http) {
	 /* 分页功能的实现 */
    $scope.pageSize = 10;// 分页显示记录数
	$scope.currentPage = 1;// 默认当前页为第一页
	$scope.totalPage = 0;// 总的页数
	$scope.totalCount = 0;// 记录的总数
    $scope.inputName = "";
    /**
     *   获得分类所有信息的方法：当name有值时，按name模糊查询
     * @param name
     */
    $scope.allClasses = function(name, pageNum) {
    	if($scope.totalPage != 0 && (pageNum < 1 || pageNum > $scope.totalPage)) {
 		   return pageNum;
 	   }
        $http.get('http://localhost:8080/sy/classes/all', {params: {'name': name, 'currentPage':pageNum, 'pageSize':$scope.pageSize}})
            .success(function (data) {
                if (data.data.total == 0) {
                    $scope.data = "";
                    $scope.isShow = false;
                } else {
                	$scope.totalCount = data.data.total;// 总记录数
                	$scope.totalPage = Math.ceil( $scope.totalCount / $scope.pageSize);// 总页数
                	$scope.data = data.data.documents;// 要展示的数据
                    $scope.isShow = true;
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
    //分类初始化渲染
    $scope.allClasses("",$scope.currentPage);
    /**
	 * 点击上一页时
	 */
	$scope.previous = function() {
		$scope.allClasses($scope.inputName, --$scope.currentPage);
	}
	
	/**
	 * 点击数字页时
	 */
	$scope.current = function(page) {
		$scope.allClasses($scope.inputName, page);
	}
	
	/**
	 * 点击下一页时
	 */
	$scope.next = function() {
		$scope.allClasses($scope.inputName, ++$scope.currentPage);
	}
	
	// 判断是否是当前页
    $scope.isActivePage = function(page) {
        return page === $scope.currentPage;
    }

    /**
     *通过分类id删除这个分类
     * @param tid
     */
    $scope.deleteClasses = function (tid) {
        $http.get('http://localhost:8080/sy/classes/delete', {params: {'id': tid, 'operator': operatorName}})
            .success(function (data) {
                if (data.msg == "failed") {
                    alert(data.data);
                } else {
                    alert("删除分类信息成功");
                    $scope.allClasses("", $scope.currentPage);
                }
            }).error(function (err) {
            	alert(err.error);
        });
    }
   /* $scope.queryByPid = function () {
    	$http.get('http://localhost:8080/sy/classes/allbypid', {params: {'projectId': $scope.queryPid+""}})
        .success(function (data) {
            if (data.msg == "failed") {
                alert(data.data);
            } else {
            	$scope.isShow = false;
            	$scope.data = data.data.documents;
            }
        }).error(function (err) {
        	alert(err.error)
    });
    }*/
    
    $scope.addValue = function () {
        $scope.addReason = "";
        /*用来存放添加时产生的错误的信息，每次添加前先置空*/
    }
    /**
     * 添加分类信息的方法
     */
    $scope.addClasses = function () {
    	$scope.addReason = "";
        var params = {
            'operator': operatorName,
            'sortId': $scope.addSortId + "",
            'name': $scope.addName,
            'parentId': $scope.addParentId + "",
            'remark': $scope.addRemark,
        }
        $http.post("http://localhost:8080/sy/classes/add", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.addReason = data.data;
                } else {
                    alert("添加分类信息成功");
                    $scope.allClasses("", $scope.currentPage);
                    $("#addClassesModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err.error);
            });
    }

    /**
     * 更新分类信息时，先把原数据绑定到模态框上
     * @param i 所点击的那一行的数据
     */
    $scope.updateValue = function (i) {
        $scope.updateName = i.name;
        $scope.updateSortId = i.sortId;
        $scope.updateParentId = i.parentId=="0"?"":i.parentId+"";
        $scope.updateRemark = i.remark;
        $scope.id = i.id;
    }
    /**
     * 点击更新-确认按钮是发送更新请求
     */
    $scope.updateClasses = function () {
    	var params = {
    			'operator': operatorName,
                'sortId': $scope.updateSortId + "",
                'name' : $scope.updateName,
                'parentId': $scope.updateParentId==""?"0":$scope.updateParentId,
                'remark': $scope.updateRemark,
                'id' : $scope.id+"",
            }
        $http.post("http://localhost:8080/sy/classes/update", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.updateReason = data.data;
                } else {
                    alert("修改分类信息成功");
                    $scope.allClasses("", $scope.currentPage);
                    $("#updateClassesModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err.error);
            });
    }

    /**
     * 通过分类名模糊查询
     */
    $scope.queryByName = function () {
    	$scope.allClasses($scope.inputName, 1);
    }
}]);