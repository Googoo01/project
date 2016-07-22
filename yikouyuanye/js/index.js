/*页面高度设置*/
!function() {
	$('.page').css('minHeight',$(window).height()+'px')
	$(window).on('resize',function(){
		$('.page').css('minHeight',$(window).height()+'px')
		if($(window).width()<1024){
			$('.nav').css({'position':'absolute','left':'0','marginLeft':'0'})
		}else{
			$('.nav').css({'position':'fixed','left':'50%','marginLeft':'-465px'})
		}
	});
	if($(window).width()<1024){
		$('.nav').css({'position':'absolute','left':'0','marginLeft':'0'})
	}
	/*End 页面高度设置*/

	/*首屏动画*/
	var toTop = $('.page0').find('.toTop');
	var toBot = $('.page0').find('.toBot');
	toTop.slideUp(800);
	toBot.animate({height:0},800,function(){
		$('.page0').remove();
	});
	/*End 首屏动画*/

	/*滚动换页事件*/
	var curpage = 1;
	var logoRemoved = false;
	var logoA;
	$(window).on('scroll',function(){
		//if($(this).scrollTop()>$(window).height()/3&&$(this).scrollTop()<$(window).height()&&curpage==1){
		if($(this).scrollTop()>$(window).height()/3&&curpage==1){
			curpage = 2;
			hidePage(1);
			$('.findMor').slideUp(200);
			$('.mor').slideUp(200);
		}else if($(this).scrollTop()<$(window).height()/3&&curpage == 2){
			curpage = 1;
			showPage(1);
			$('.findMor').slideDown(200);
			$('.mor').slideDown(200);
		}
		var p2top = $('.page2').offset().top-$(window).scrollTop();
		if(p2top<50&&p2top>-50&&!logoRemoved){
			logoRemoved = true;
			//logoA = $('.logo').find('a').detach();
			$('.logo').find('a').slideUp(100);
		}else if(logoRemoved&&(p2top<-100||p2top>50)){
			logoRemoved=false;
			//logoA.appendTo('.logo')
			$('.logo').find('a').slideDown(100);
		}
	})
	function hidePage(page){
		if(page==1){
			$('.goJD').animate({bottom:'150%',left:'100%'},800)
			$('.code').animate({bottom:'150%',left:'100%'},800)
			$('.product').animate({bottom:'-50%',left:'-100%'},800)
		}
	}
	function showPage(page){
		if(page==1){
			$('.goJD').animate({bottom:'283px',left:'84px'},800)
			$('.code').animate({bottom:'114px',left:'84px'},800)
			$('.product').animate({bottom:'5px',left:'291px'},800)
		}
	}
	/*End 滚动换页事件*/

	/*特色蒙版事件*/
	var lastMouseX = 0;
    var lastMouseY = 0;
    $('body').on('mousemove', function(e) {
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;
    });

	$('.tese a').on('mouseenter',function(e) {
        e = jQuery.event.fix(e);
        var work = $(this);
        var workOffset = work.offset();
        //var otherWorksThumb = work.siblings('.work').find('.thumb .color');
        //var allWorksThumb = $('#works .work .thumb .color');
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        //var threshold = 20;
        var from = 'left';
        var to = 'right';
        if (e.type == 'mouseenter') {
            if (lastMouseX <= workOffset.left) {
                from = 'left';
            } else if (lastMouseX >= workOffset.left + work.width()) {
                from = 'right';
            } else if (lastMouseY <= workOffset.top) {
                from = 'top';
            } else if (lastMouseY >= workOffset.top + work.height()) {
                from = 'bottom';
            }
            //otherWorksThumb.stop(true).fadeTo(200, 0, 'linear');
            
            showWorkInfo(work, from);
        }
    });

	$('.tese a span').on('mouseout',function(e) {
        e = jQuery.event.fix(e);
        var work = $(this);
        var workOffset = work.offset();
        //var otherWorksThumb = work.siblings('.work').find('.thumb .color');
        //var allWorksThumb = $('#works .work .thumb .color');
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        //var threshold = 20;
        var from = 'left';
        var to = 'right';
        if (e.type == 'mouseout') {
            if (mouseX <= workOffset.left) {
                to = 'left';
            } else if (mouseX >= workOffset.left + work.width()) {
                to = 'right';
            } else if (mouseY <= workOffset.top) {
                to = 'top';
            } else if (mouseY >= workOffset.top + work.height()) {
                to = 'bottom';
            }
            hideWorkInfo(work, to);
        }
    });
	function showWorkInfo(work, from){
		// $('.tese a span').each(function(index){
		// 	$(this).stop(false,true);
		// })
		var info = $(work).find('span');
		if(from=='left'){
			info.css({'left':'-230px','top':'5px','display':'block'})
			info.animate({'left':'5px'},200)
		}else if(from=='right'){
			info.css({'left':'240px','top':'5px','display':'block'})
			info.animate({'left':'5px'},200)
		}else if(from=='top'){
			info.css({'left':'5px','top':'-485px','display':'block'})
			info.animate({'top':'5px'},200)
		}else if(from=='bottom'){
			info.css({'left':'5px','top':'485px','display':'block'})
			info.animate({'top':'5px'},200)
		}
	}
	function hideWorkInfo(work, to){
		// $('.tese a span').each(function(index){
		// 	$(this).stop(false,true);
		// })
		var info = $(work);
		if(to=='left'){
			//info.css({'left':'-230px','top':'5px','display':'block'})
			info.animate({'left':'-240px'},200)
		}else if(to=='right'){
			info.animate({'left':'240px'},200)
		}else if(to=='top'){
			info.animate({'top':'-485px'},200)
		}else if(to=='bottom'){
			info.animate({'top':'500px'},200)
		}
	}
	/*End 特色模块蒙版事件*/

	/*新闻和视频展示*/
	$('.itm4').on('click',function(){
		$('.newsLst').fadeIn(500)
	})
	$('.close').eq(0).on('click',function(ind){
		$('.newsLst').fadeOut(300)
	})
	$('.itm3').on('click',function(){
		$('.video').fadeIn(500)
	})
	$('.close').eq(1).on('click',function(ind){
		$('.video').fadeOut(300);
		$('#example_video_1').find('video')[0].pause();
	})
	/*End 新闻和视频展示*/

	/*返回顶部按钮*/
	$('.back').find('a').on('click',function(e){
		$('html').animate({scrollTop:0},500)/*兼容火狐*/
		$('body').animate({scrollTop:0},500)/*兼容chrome*/
	})
	/*End 返回顶部按钮*/
}()