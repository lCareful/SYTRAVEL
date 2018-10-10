
app.controller('projectCtrl', ['$scope', '$http', function ($scope, $http) {
	 /* 分页功能的实现 */
    $scope.pageSize = 5;// 分页显示记录数
	$scope.currentPage = 1;// 默认当前页为第一页
	$scope.totalPage = 0;// 总的页数
	$scope.totalCount = 0;// 记录的总数
    //初始化页面
    $scope.inputName = "";
    /**
     *   获得项目所有信息的方法：当name有值时，按name模糊查询
     * @param name
     */
    $scope.allProject = function(name, pageNum) {
    	if($scope.totalPage != 0 &&(pageNum<1||pageNum>$scope.totalPage)){
    		return pageNum;
    	}
        $http.get('http://localhost:8080/sy/project/all', {params:{'name':name,'currentPage':pageNum, 'pageSize':$scope.pageSize}})
            .success(function (data) {
                if(data.data.total == 0){
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
            alert(err);
        });
    }
    $scope.allProject("",$scope.currentPage);
    /**
	 * 点击上一页时
	 */
	$scope.previous = function() {
		$scope.allProject($scope.inputName, --$scope.currentPage);
	}
	
	/**
	 * 点击数字页时
	 */
	$scope.current = function(page) {
		$scope.allProject($scope.inputName, page);
	}
	
	/**
	 * 点击下一页时
	 */
	$scope.next = function() {
		$scope.allProject($scope.inputName, ++$scope.currentPage);
	}
	
	// 判断是否是当前页
    $scope.isActivePage = function(page) {
        return page === $scope.currentPage;
    }

    /**
     *
     * @param pid
     */
    $scope.deleteProject = function (pid) {
        $http.get('http://localhost:8080/sy/project/delete',{params:{'id':pid, 'operator':operatorName}})
            .success(function (data) {
                if(data.msg == "failed"){
                    alert(data.data);
                } else {
                    alert("删除项目成功");
                    $scope.allProject("", $scope.currentPage);
                }
            }).error(function () {
            console.log("error");
        });
    }
    $scope.addValue = function () {
        $scope.addReason = "";/*用来存放添加时产生的错误的信息，每次添加前先置空*/
    }
    /**
     * 添加项目信息的方法
     */
    $scope.addProject = function () {
    	var bDate = "";
    	if($scope.addBeginDate != undefined){
    		var begDate = new Date($scope.addBeginDate);
            bDate = begDate.getFullYear() + "-" + (begDate.getMonth()+1) + "-" + begDate.getDate() + " " + begDate.getHours() + ":" +begDate.getMinutes() + ":" + begDate.getSeconds();
    	}
    	var eDate = "";
    	if($scope.addEndDate != undefined){
    		var date = new Date($scope.addEndDate);
            eDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" +date.getMinutes() + ":" + date.getSeconds();
    	}
        var params = {
            'operator': operatorName,
            'code' : $scope.addCode,
            'name' : $scope.addName,
            'beginDate' : bDate,
            'endDate' : eDate,
            'valid' : $scope.addValid,
            'remark' : $scope.addRemark,
        }

        $http.post("http://localhost:8080/sy/project/add", JSON.stringify(params))
            .success(function (data) {
                if(data.msg == "failed") {
                    $scope.addReason = data.data;
                } else {
                    alert("添加项目成功");
                    $scope.allProject("", $scope.currentPage);
                    $("#addProjectModal").modal("hide");
                }
            })
            .error(function (err) {
                alert(err);
            });
    }

    /**
     * 更新项目信息时，先把原数据绑定到模态框上
     * @param i 所点击的那一行的数据
     */
    $scope.updateValue = function(i){
        $scope.updateCode = i.code;
        $scope.updateName = i.name;
        $scope.updateBeginDate = new Date(i.beginDate);
        $scope.updateEndDate = new Date(i.endDate);
        $scope.updateValid = i.valid;
        $scope.updateRemark = i.remark;
        $scope.id = i.id;
    }
    /**
     * 点击更新-确认按钮是发送更新请求
     */
    $scope.updateProject = function(){
        var begDate = new Date($scope.updateBeginDate);
        var bDate = begDate.getFullYear() + "-" + (begDate.getMonth()+1) + "-" + begDate.getDate() + " " + begDate.getHours() + ":" +begDate.getMinutes() + ":" + begDate.getSeconds();
        var date = new Date($scope.updateEndDate);
        var eDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" +date.getMinutes() + ":" + date.getSeconds();
        var params = {
            'id' :  $scope.id + "",
            'operator': operatorName,
            'code' : $scope.updateCode,
            'name' : $scope.updateName,
            'beginDate' : bDate,
            'endDate' : eDate,
            'valid' : $scope.updateValid,
            'remark' : $scope.updateRemark,
        }

        $http.post("http://localhost:8080/sy/project/update", JSON.stringify(params))
            .success(function (data) {
            	console.log(data);
               if(data.msg == "failed") {
                    $scope.updateReason = data.data;
                } else {
                    alert("修改项目成功");
                    $scope.allProject("", $scope.currentPage);
                    $("#updateProjectModal").modal("hide");
                }
            })
            .error(function (err) {
                alert("error" + err);
            });
    }

    /**
     * 通过项目名模糊查询
     */
    $scope.queryByName = function () {
    	 $scope.allProject($scope.inputName,1);
    }
}]);
