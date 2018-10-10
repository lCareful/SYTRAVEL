/*---LEFT BAR ACCORDION----*/
$(function() {
	$(".go-top").click(function() {
		$(".site-footer").hide();
	})
	/** **************侧边栏折叠动画****************** */
	$('.sub-menu>a').click(
			function() {
				/** 首先移除被选中的标记，把加号变为减号，再关闭所有的侧边栏都折叠，选中那个那个展开*** */
				$('.sub-menu').children('a').removeClass('active');
				$('.sub-menu').children('a').siblings('ul').slideUp("slow");
				$('.sub-menu').children('a').children('.fa-minus').removeClass("fa-minus")
				.addClass("fa-plus");
				$(this).addClass('active');
				if ($(this).siblings('ul').css('display') == 'none') {
					$(this).siblings('ul').slideDown('slow');
					$(this).children('.fa-plus').removeClass("fa-plus")
							.addClass("fa-minus");
				} else {
					$(this).children('.fa-minus').removeClass("fa-minus")
							.addClass("fa-plus");
					$(this).siblings('ul').slideUp("slow");
				}
			});

	$("#submit").click(function() {
		$("#show .table tbody tr").addClass("abc")
	})

});

var Script = function() {

	// 边栏下拉菜单自动滚动
	jQuery('#sidebar .sub-menu > a').click(function() {
		var o = ($(this).offset());
		diff = 250 - o.top;
		if (diff > 0)
			$("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
		else
			$("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
	});
	// 边栏切换
	$(function() {
		function responsiveView() {
			var wSize = $(window).width();
			if (wSize <= 768) {
				$('#container').addClass('sidebar-close');
				$('#sidebar > ul').hide();
			}
			if (wSize > 768) {
				$('#container').removeClass('sidebar-close');
				$('#sidebar > ul').show();
			}
		}
		$(window).on('load', responsiveView);
		$(window).on('resize', responsiveView);
	});

	$('.fa-bars').click(function() {
		if ($('#sidebar > ul').is(":visible") === true) {
			$('#main-content').css({
				'margin-left' : '0px'
			});
			$('#sidebar').css({
				'margin-left' : '-210px'
			});
			$('#sidebar > ul').hide();
			$("#container").addClass("sidebar-closed");
		} else {
			$('#main-content').css({
				'margin-left' : '210px'
			});
			$('#sidebar > ul').show();
			$('#sidebar').css({
				'margin-left' : '0'
			});
			$("#container").removeClass("sidebar-closed");
		}
	});

	jQuery('.panel .tools .fa-chevron-down')
			.click(
					function() {
						var el = jQuery(this).parents(".panel").children(
								".panel-body");
						if (jQuery(this).hasClass("fa-chevron-down")) {
							jQuery(this).removeClass("fa-chevron-down")
									.addClass("fa-chevron-up");
							el.slideUp(200);
						} else {
							jQuery(this).removeClass("fa-chevron-up").addClass(
									"fa-chevron-down");
							el.slideDown(200);
						}
					});

	jQuery('.panel .tools .fa-times').click(function() {
		jQuery(this).parents(".panel").parent().remove();
	});

	// tool tips
	$('.tooltips').tooltip();
	// popovers
	$('.popovers').popover();
	// custom bar chart
	if ($(".custom-bar-chart")) {
		$(".bar").each(function() {
			var i = $(this).find(".value").html();
			$(this).find(".value").html("");
			$(this).find(".value").animate({
				height : i
			}, 2000)
		})
	}
}();