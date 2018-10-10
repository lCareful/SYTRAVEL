app.controller('userCtrl', ['$scope', '$http', function ($scope, $http) {
	if(operatorName != "admin"){
		$scope.showBtn = false;
	} else {
		$scope.showBtn = true;
	}
	$scope.userData = [
		{id:0, name:'管理员'},
		{id:1, name:'项目负责人'},
		{id:2, name:'团队负责人'},
		{id:3, name:'产品经理'},
		{id:4, name:'审计'},
		{id:5, name:'监控'},
	];
	
	 /* 分页功能的实现 */
    $scope.pageSize = 10;// 分页显示记录数
	$scope.currentPage = 1;// 默认当前页为第一页
	$scope.totalPage = 0;// 总的页数
	$scope.totalCount = 0;// 记录的总数
    $scope.inputName = "";
    
    /**
	 * 获得用户所有信息的方法：当name有值时，按name模糊查询
	 * 
	 * @param name
	 */
    $scope.allUser = function(name, pageNum) {
    	if($scope.totalPage != 0 && (pageNum < 1 || pageNum > $scope.totalPage)) {
 		   return pageNum;
 	   }
        $http.get('http://localhost:8080/sy/user/all', {params: {'name': name, 'currentPage':pageNum, 'pageSize':$scope.pageSize}})
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
    // 用户初始化渲染
    $scope.allUser("", $scope.currentPage);

    /**
	 * 通过用户id删除这个用户
	 * 
	 * @param tid
	 */
    $scope.deleteUser = function (uid) {
        $http.get('http://localhost:8080/sy/user/delete', {params: {'id': uid, 'operator': operatorName}})
            .success(function (data) {
                if (data.msg == "failed") {
                    alert(data.data);
                } else {
                    alert("删除用户信息成功");
                    $scope.allUser("", $scope.currentPage);
                }
            }).error(function (err) {
            	alert(err.error);
        });
    }

    $scope.addValue = function () {
        $scope.addReason = "";
        $scope.addUsername = "";
        $scope.addPassword = "";
        /* 用来存放添加时产生的错误的信息，每次添加前先置空 */
    }
    /**
	 * 添加用户信息的方法
	 */
    $scope.addUser = function () {
    	$scope.addReason = "";
        var params = {
            'operator': operatorName,
            'username': $scope.addUsername,
            'password': $scope.addPassword,
            'permission': $scope.addPermission==undefined?"":$scope.addPermission+"",
            'remark': $scope.addRemark,
        }
        $http.post("http://localhost:8080/sy/user/add", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.addReason = data.data;
                } else {
                    alert("添加用户信息成功");
                    $scope.allUser("", $scope.currentPage);
                    $("#addUserModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err.error);
            });
    }

    /**
	 * 更新用户信息时，先把原数据绑定到模态框上
	 * 
	 * @param i
	 *            所点击的那一行的数据
	 */
    $scope.updateValue = function (i) {
        $scope.updateUsername = i.username;
        $scope.UpdatePermission = i.permission+"";
        $scope.updateRemark = i.remark;
        $scope.id = i.id;
    }
    
    /**
	 * 点击更新-确认按钮是发送更新请求
	 */
    $scope.updateUser = function () {
    	var params = {
    			'operator': operatorName,
                'permission': $scope.UpdatePermission + "",
                'password':$scope.updatePassword==undefined?"":$scope.updatePassword+"",
                'remark': $scope.updateRemark,
                'id' : $scope.id+"",
            }
        $http.post("http://localhost:8080/sy/user/update", JSON.stringify(params))
            .success(function (data) {
                if (data.msg == "failed") {
                    $scope.updateReason = data.data;
                } else {
                    alert("修改用户信息成功");
                    $scope.allUser("", $scope.currentPage);
                    $("#updateUserModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err.error);
            });
    }
    $scope.updateP = function(){
    	$scope.updatePwdReason = "";
    }
    $scope.updateAdminP = function(){
    	if($scope.updateNewPwd != $scope.newPwd){
    		alert("新密码输入不一致");
    	} else {
    		var params = {
    				'operator': operatorName,
    	            'password': $scope.updateDatePwd==undefined?"":$scope.updateDatePwd+"",
    	            'newPwd': $scope.newPwd==undefined?"":$scope.newPwd+"",
    	            'id' : $scope.id+"",
    	        }
    	    	$http.post("http://localhost:8080/sy/user/adminpwd", JSON.stringify(params))
    	        .success(function (data) {
    	            if (data.msg == "failed") {
    	                $scope.updatePwdReason = data.data;
    	            } else {
    	                alert("修改超级管理员密码成功");
    	                window.parent.document.location.href = "http://localhost:8080/login.html";
    	            }
    	        })
    	        .error(function (err) {
    	            alert(err.error);
    	        });
    	}
    }
    
    /**
	 * 点击上一页时
	 */
	$scope.previous = function() {
		$scope.allUser($scope.inputName, --$scope.currentPage);
	}
	
	/**
	 * 点击数字页时
	 */
	$scope.current = function(page) {
		$scope.allUser($scope.inputName, page);
	}
	
	/**
	 * 点击下一页时
	 */
	$scope.next = function() {
		$scope.allUser($scope.inputName, ++$scope.currentPage);
	}
	
	// 判断是否是当前页
    $scope.isActivePage = function(page) {
        return page === $scope.currentPage;
    }
    /**
	 * 通过用户名模糊查询
	 */
    $scope.queryByName = function () {
    	$scope.allUser($scope.inputName, 1);
    }
}]);