app.controller('productCtrl', [
		'$scope',
		'$http',
		function($scope, $http) {
			 /* 分页功能的实现 */
		    $scope.pageSize = 5;// 分页显示记录数
			$scope.currentPage = 1;// 默认当前页为第一页
			$scope.totalPage = 0;// 总的页数
			$scope.totalCount = 0;// 记录的总数
		    $scope.inputName = "";
			
			/**
			 * 获得产品所有信息的方法：当name有值时，按name模糊查询
			 * 
			 * @param name
			 */
		    $scope.allProduct = function(name, pageNum) {
		    	if($scope.totalPage != 0 && (pageNum < 1 || pageNum > $scope.totalPage)) {
		 		   return pageNum;
		 	   }
				$http.get('http://localhost:8080/sy/product/all', {
					params : {
						'name' : name,
						'currentPage':pageNum,
						'pageSize':$scope.pageSize
					}
				}).success(function(data) {
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
				}).error(function(err) {
					alert(err.error);
				});
			}
		    // 产品管理初始化渲染
		    $scope.allProduct("",$scope.currentPage);
		    /**
			 * 点击上一页时
			 */
			$scope.previous = function() {
				$scope.allProduct($scope.inputName, --$scope.currentPage);
			}
			
			/**
			 * 点击数字页时
			 */
			$scope.current = function(page) {
				$scope.allProduct($scope.inputName, page);
			}
			
			/**
			 * 点击下一页时
			 */
			$scope.next = function() {
				$scope.allProduct($scope.inputName, ++$scope.currentPage);
			}
			
			// 判断是否是当前页
		    $scope.isActivePage = function(page) {
		        return page === $scope.currentPage;
		    }

		    
			/**
			 * 通过产品id删除这个产品
			 * 
			 * @param productId
			 */
			$scope.deleteProduct = function(productId) {
				$http.get('http://localhost:8080/sy/product/delete', {
					params : {
						'id' : productId,
						'operator' : operatorName
					}
				}).success(function(data) {
					if (data.msg == "failed") {
						alert(data.data);
					} else {
						alert("删除产品信息成功");
						$scope.allProduct("", $scope.currentPage);
					}
				}).error(function(err) {
					alert(err.error);
				});
			}

			/**
			 * 用来存放添加时产生的错误的信息，每次添加前先置空
			 */
			$scope.addValue = function() {
				$scope.addReason = "";
			}
			/**
			 * 添加产品信息的方法
			 */
			$scope.addProduct = function() {
				var onlineDate = "";
				if ($scope.addOnlineDate != undefined) {
					var begDate = new Date($scope.addOnlineDate);
					onlineDate = begDate.getFullYear() + "-"
							+ (begDate.getMonth() + 1) + "-"
							+ begDate.getDate() + " " + begDate.getHours()
							+ ":" + begDate.getMinutes() + ":"
							+ begDate.getSeconds();
				}
				var offlineDate = "";
				if ($scope.addOnlineDate != undefined) {
					var date = new Date($scope.addOfflineDate);
					offlineDate = date.getFullYear() + "-"
							+ (date.getMonth() + 1) + "-" + date.getDate()
							+ " " + date.getHours() + ":" + date.getMinutes()
							+ ":" + date.getSeconds();
				}
				var params = {
					'operator' : operatorName,
					'code' : $scope.addCode,
					'name' : $scope.addName,
					'teamId' : $scope.addTeamId == "" ? ""
							: ($scope.addTeamId + ""),
					'exText' : $scope.addExText,
					'onlineDate' : onlineDate,
					'offlineDate' : offlineDate,
					'classId' : $scope.addClassId == "" ? ""
							: ($scope.addClassesId + ""),
					'quantity' : $scope.addQuantity,
					'minQty' : $scope.addMinQty,
					'soldQty' : $scope.addSoldQty,
					'price' : $scope.addPrice,
					'nights' : $scope.addNights,
					'status' : $scope.addStatus == "" ? "" : $scope.addStatus,
					'remark' : $scope.addRemark,
				}
				$http.post("http://localhost:8080/sy/product/add",
						JSON.stringify(params)).success(function(data) {
					if (data.msg == "failed") {
						$scope.addReason = data.data;
					} else {
						alert("添加产品信息成功");
						$scope.allProduct("", $scope.currentPage);
						$("#addProductModal").modal("hide");
					}
				}).error(function(err) {
					alert(err.error);
				});
			}

			/**
			 * 更新产品信息时，先把原数据绑定到模态框上
			 * 
			 * @param i
			 *            所点击的那一行的数据
			 */
			$scope.updateValue = function(i) {
				$scope.updateName = i.name;
				$scope.updateExText = i.exText;
				$scope.updateQuantity = i.quantity;
				$scope.updateMinQty = i.minQty;
				$scope.updateSoldQty = i.soldQty;
				$scope.updatePrice = i.price;
				$scope.updateNights = i.nights;
				$scope.updateStatus = i.status + "";
				$scope.updateRemark = i.remark;
				$scope.id = i.id;
			}
			/**
			 * 点击更新-确认按钮是发送更新请求
			 */
			$scope.updateProduct = function() {
				var params = {
					'operator' : operatorName,
					'id' : $scope.id,
					'name' : $scope.updateName,
					'exText' : $scope.updateExText,
					'quantity' : $scope.updateQuantity,
					'minQty' : $scope.updateMinQty,
					'soldQty' : $scope.updateSoldQty,
					'price' : $scope.updatePrice,
					'nights' : $scope.updateNights,
					'status' : $scope.updateStatus,
					'remark' : $scope.updateRemark,
				}
				$http.post("http://localhost:8080/sy/product/update",
						JSON.stringify(params)).success(function(data) {
					if (data.msg == "failed") {
						$scope.updateReason = data.data;
					} else {
						alert("修改产品信息成功");
						$scope.allProduct("", $scope.currentPage);
						$("#updateProductModal").modal("hide");
					}
				}).error(function(err) {
					alert(err.error);
				});
			}
			/**
			 * 通过产品名模糊查询
			 */
			$scope.queryByName = function() {
				$scope.allProduct($scope.inputName, 1);
			}

			/**
			 * 初始化团队下拉框
			 */
			teamAll();
			function teamAll() {
				$http.get('http://localhost:8080/sy/team/all', {
					params : {
						'name' : "",
						'currentPage':1,
						'pageSize':2147483647
					}
				}).success(function(data) {
					if (data.data.total == 0) {
						$scope.tdata = "";
					} else {
						$scope.tdata = data.data.documents;
					}
				}).error(function(err) {
					alert(err.error);
				});
			}
			/**
			 * 点击团队下拉框时查出这个团队下的产品信息
			 */
			$scope.queryByTid = function() {
				$http.get('http://localhost:8080/sy/product/teamid', {
					params : {
						'id' : $scope.queryTid + "",
					}
				}).success(function(data) {
					$scope.isShow = false;
					if (data.data.total == 0) {
						$scope.data = "";
					} else {
						$scope.data = data.data.documents;
					}
				}).error(function(err) {
					alert(err.error);
				});
			}

			/**
			 * 初始化分类下拉框
			 */
			classesAll();
			function classesAll() {
				$http.get('http://localhost:8080/sy/classes/all', {
					params : {
						'name' : "",
						'currentPage':1,
						'pageSize':2147483647
					}
				}).success(function(data) {
					if (data.data.total == 0) {
						$scope.cdata = "";
					} else {
						$scope.cdata = data.data.documents;
					}
				}).error(function(err) {
					alert(err.error);
				});
			}

			/**
			 * 点击分类下拉框时，查看这个分类下的产品信息
			 */
			$scope.queryByCid = function() {
				$http.get('http://localhost:8080/sy/product/classid', {
					params : {
						'id' : $scope.queryCid + "",
					}
				}).success(function(data) {
					$scope.isShow = false;
					if (data.data.total == 0) {
						$scope.data = "";
					} else {
						$scope.data = data.data.documents;
					}
				}).error(function(err) {
					alert(err.error);
				});
			}
		} ]);