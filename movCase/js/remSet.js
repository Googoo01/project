(function(){
	//设置基础字号，页面样式用rem  
	//以在页面宽度为640px条件下，1rem:100px的比例为基数
	//lgw 2016-05-22
	window.Com=window.Com||{};
	window.Com.ResetRem=function(BaseWidth){
		var PAGE_MIN_WIDTH=BaseWidth||640,  BASE_FONT_SIZE=100, NOW_FONT_SIZE=100;
	    NOW_FONT_SIZE=Math.min((window.innerWidth)/PAGE_MIN_WIDTH*BASE_FONT_SIZE,BASE_FONT_SIZE);
	    document.documentElement.style.fontSize=NOW_FONT_SIZE+"px";
	    
	    window.Page=window.Page||{}
	    window.Page.PAGE_MIN_WIDTH=PAGE_MIN_WIDTH;
	    window.Page.BASE_FONT_SIZE=BASE_FONT_SIZE;
	    window.Page.NOW_FONT_SIZE=NOW_FONT_SIZE;
	}	
	 window.addEventListener("load",function(){
	 	window.Com.ResetRem(750);
	 });
	 window.Com.ResetRem(750);
})();