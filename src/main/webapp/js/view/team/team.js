app.controller('teamCtrl', ['$scope', '$http', function ($scope, $http) {
	 /* 分页功能的实现 */
    $scope.pageSize = 5;// 分页显示记录数
	$scope.currentPage = 1;// 默认当前页为第一页
	$scope.totalPage = 0;// 总的页数
	$scope.totalCount = 0;// 记录的总数
    $scope.inputName = "";
    /**
     *   获得团队所有信息的方法：当name有值时，按name模糊查询
     * @param name
     */
   $scope.allTeam = function(name, pageNum) {
	   if($scope.totalPage != 0 && (pageNum < 1 || pageNum > $scope.totalPage)) {
		   return pageNum;
	   }
        $http.get('http://localhost:8080/sy/team/all', {params: {'name': name, 'currentPage':pageNum, 'pageSize':$scope.pageSize}})
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
            alert(err);
        });
    }
   //团队管理初始化渲染
    $scope.allTeam("",$scope.currentPage);
    /**
	 * 点击上一页时
	 */
	$scope.previous = function() {
		$scope.allTeam($scope.inputName, --$scope.currentPage);
	}
	
	/**
	 * 点击数字页时
	 */
	$scope.current = function(page) {
		$scope.allTeam($scope.inputName, page);
	}
	
	/**
	 * 点击下一页时
	 */
	$scope.next = function() {
		$scope.allTeam($scope.inputName, ++$scope.currentPage);
	}
	
	// 判断是否是当前页
    $scope.isActivePage = function(page) {
        return page === $scope.currentPage;
    }

    /**
     *通过团队id删除这个团队
     * @param tid
     */
    $scope.deleteTeam = function (tid) {
        $http.get('http://localhost:8080/sy/team/delete', {params: {'id': tid, 'operator': operatorName}})
            .success(function (data) {
                if (data.msg == "failed") {
                    alert(data.data);
                } else {
                    alert("删除团队信息成功");
                    $scope.allTeam("", $scope.currentPage);
                }
            }).error(function () {
            console.log("error");
        });
    }
    $scope.queryByPid = function () {
    	$http.get('http://localhost:8080/sy/team/allbypid', {params: {'projectId': $scope.queryPid+""}})
        .success(function (data) {
            if (data.msg == "failed") {
                alert(data.data);
            } else {
            	$scope.isShow = false;
            	$scope.data = data.data.documents;// 要展示的数据
            }
        }).error(function () {
        console.log("error");
    });
    }
    
    $scope.addValue = function () {
        $scope.addReason = "";
        /*用来存放添加时产生的错误的信息，每次添加前先置空*/
    }
    /**
     * 添加团队信息的方法
     */
    $scope.addTeam = function () {
        var params = {
            'operator': operatorName,
            'code': $scope.addCode,
            'name': $scope.addName,
            'projectId': $scope.addPid,
            'valid': $scope.addValid,
            'remark': $scope.addRemark
        }
        $http.post("http://localhost:8080/sy/team/add", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.addReason = data.data;
                } else {
                    alert("添加团队信息成功");
                    $scope.allTeam("", $scope.currentPage);
                    $("#addTeamModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err);
            });
    }

    /**
     * 更新团队信息时，先把原数据绑定到模态框上
     * @param i 所点击的那一行的数据
     */
    $scope.updateValue = function (i) {
        $scope.updateName = i.name;
        $scope.updatePid = i.projectId;
        $scope.updateValid = i.valid;
        $scope.updateRemark = i.remark;
        $scope.id = i.id;
    }
    /**
     * 点击更新-确认按钮是发送更新请求
     */
    $scope.updateTeam = function () {
    	var params = {
                'operator': operatorName,
                'name' : $scope.updateName,
                'projectId': $scope.updatePid,
                'valid': $scope.updateValid,
                'remark': $scope.updateRemark,
                'id' : $scope.id+"",
            }

        $http.post("http://localhost:8080/sy/team/update", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.updateReason = data.data;
                } else {
                    alert("修改团队信息成功");
                    $scope.allTeam("", $scope.currentPage);
                    $("#updateTeamModal").modal("hide");
                }
            })
            .error(function (err) {
                alert("error" + err);
            });
    }

    /**
     * 通过团队名模糊查询
     */
    $scope.queryByName = function () {
    	 $scope.allTeam($scope.inputName, 1);
    }

    allProject();
    /**
     * 获得所有团队信息用来做下拉列表使用
     */
    function allProject() {
        $http.get('http://localhost:8080/sy/project/all', {params:{'name':"", 'currentPage':1, 'pageSize':2147483647}})
            .success(function (data) {
                if(data.data.total == 0){
                    $scope.pdata = "";
                } else {
                    $scope.pdata = data.data.documents;
                }
            }).error(function (err) {
            alert(err);
        });
    }
}]);