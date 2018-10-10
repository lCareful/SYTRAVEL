app.controller('roleCtrl', ['$scope', '$http', function ($scope, $http) {
	 /* 分页功能的实现 */
    $scope.pageSize = 10;// 分页显示记录数
	$scope.currentPage = 1;// 默认当前页为第一页
	$scope.totalPage = 0;// 总的页数
	$scope.totalCount = 0;// 记录的总数
    $scope.inputName = "";
    /**
	 * 获得角色所有信息的方法,当teamId有值时差的是所选团队下的角色信息
	 * 
	 * @param teamId
	 */
   $scope.allRole = function(teamId, pageNum) {
	   if($scope.totalPage != 0 && (pageNum < 1 || pageNum > $scope.totalPage)) {
		   return pageNum;
	   }
        $http.get('http://localhost:8080/sy/role/all', {params: {'teamId': teamId, 'currentPage':pageNum, 'pageSize':$scope.pageSize}})
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
    // 角色管理初始化渲染
    $scope.allRole("", $scope.currentPage);
    /**
	 * 点击上一页时
	 */
	$scope.previous = function() {
		$scope.allRole($scope.inputName, --$scope.currentPage);
	}
	
	/**
	 * 点击数字页时
	 */
	$scope.current = function(page) {
		$scope.allRole($scope.inputName, page);
	}
	
	/**
	 * 点击下一页时
	 */
	$scope.next = function() {
		$scope.allRole($scope.inputName, ++$scope.currentPage);
	}
	
	// 判断是否是当前页
    $scope.isActivePage = function(page) {
        return page === $scope.currentPage;
    }


    /**
	 * 通过角色id删除这个团队
	 * 
	 * @param rid
	 */
    $scope.deleteRole = function (rid) {
        $http.get('http://localhost:8080/sy/role/delete', {params: {'id': rid, 'operator': operatorName}})
            .success(function (data) {
                if (data.msg == "failed") {
                    alert(data.data);
                } else {
                    alert("删除角色信息成功");
                    $scope.allRole("",  $scope.currentPage);
                }
            }).error(function (err) {
            	alert(err.error);
        });
    }
    
    $scope.queryByTid = function () {
    	 $scope.allRole($scope.queryTid==""?"":$scope.queryTid+"", 1);
    }
    
    $scope.addValue = function () {
        $scope.addReason = "";
        $scope.addRoles = "";
        /* 用来存放添加时产生的错误的信息，每次添加前先置空 */
    }
    /**
	 * 添加角色信息的方法
	 */
    $scope.addRole = function () {
    	$scope.addReason = "";
        var params = {
            'operator': operatorName,
            'teamId': $scope.addTeamId==""?"":$scope.addTeamId+"",
            'name': $scope.addName,
            'role': $scope.addRoles==""?"":$scope.addRoles+"",
            'email': $scope.addEmail==""?"":$scope.addEmail,
            'mobile': $scope.addMobile==undefined?"":$scope.addMobile+"",
            'remark': $scope.addRemark,
        }
        console.log($scope.addEmail)
        $http.post("http://localhost:8080/sy/role/add", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.addReason = data.data;
                } else {
                    alert("添加角色信息成功");
                    $scope.allRole("",  $scope.currentPage);
                    $("#addRoleModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err.error);
            });
    }

    /**
	 * 更新项目信息时，先把原数据绑定到模态框上
	 * 
	 * @param i
	 *            所点击的那一行的数据
	 */
    $scope.updateValue = function (i) {
    	$scope.updateName = i.name;
    	$scope.updateTname = i.tname;
        $scope.updateRoles = i.role+"";
        $scope.updateEmail = i.email;
        $scope.updateMobile = parseInt(i.mobile);
        $scope.updateRemark = i.remark;
        $scope.id = i.id;
    }
    /**
	 * 点击更新-确认按钮是发送更新请求
	 */
    $scope.updateRole = function () {
    	var params = {
    			'operator': operatorName,
                'role': $scope.updateRoles==""?"":$scope.updateRoles+"",
                'email': $scope.updateEmail,
                'mobile': $scope.updateMobile+"",
                'remark': $scope.updateRemark,
                'id' : $scope.id+"",
            }
        $http.post("http://localhost:8080/sy/role/update", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.updateReason = data.data;
                } else {
                    alert("修改角色信息成功");
                    $scope.allRole("", $scope.currentPage);
                    $("#updateRoleModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err.error);
            });
    }
    allTeam();
    function allTeam() {
        $http.get('http://localhost:8080/sy/team/all', {params: {'name': ""}})
            .success(function (data) {
                if (data.data.total == 0) {
                    $scope.tdata = "";
                } else {
                    $scope.tdata = data.data.documents;
                }
            }).error(function (err) {
            alert(err);
        });
    }
    $scope.roleData = [
		{id:0, name:'团负责人'},
		{id:1, name:'队长'},
		{id:2, name:'副队长'},
		{id:3, name:'导游'},
		{id:4, name:'成员'},
	];
}]);