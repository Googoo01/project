var slider = function(obj){
	this.id = obj.id;
	this.wrp = document.querySelector('#'+this.id);
	this.xArry = obj.axisArry;
	this.percent = obj.percent;
	this.proBar = this.wrp.querySelector('.progress');
	this.slidBlock = this.wrp.querySelector('.slidBlock');
	this.axis = this.wrp.querySelector('.axis');
	this.tzIfo = document.querySelector('#tzIfo');
	this.curNum = this.tzIfo.querySelectorAll('span')[0];
	this.profit = this.tzIfo.querySelectorAll('span')[1];
	this.slidLft = this.axis.parentNode.offsetLeft;
}
slider.prototype={
	init:function(){
		var _this = this;
		_this.creatAxis();

		this.slidBlock.addEventListener('touchmove',function(e){
			this.classList.remove('tansLft');
			_this.proBar.classList.remove('tansW');
			var ev = e||window.event;
			var curPos = ev.changedTouches[0].clientX-_this.slidLft;
			var maxX = _this.axis.parentNode.offsetWidth-_this.slidBlock.offsetWidth;
			
			ev.preventDefault();
			if(curPos>0&&curPos<maxX){
				_this.slidBlock.style.left = curPos+'px';
				_this.proBar.style.width = curPos+'px';
			}
		})
		this.slidBlock.addEventListener('touchend',function(e){
			var ev = e||window.event;
			ev.preventDefault();
			_this.moveTo(ev.changedTouches[0].clientX-_this.slidLft);
		})
		this.slidBlock.addEventListener('transitionend',function(e){
			this.classList.remove('tansLft');
			_this.proBar.classList.remove('tansW');
		})

		/*为pc添加的事件*/
		var dragFlag = false;
		this.slidBlock.addEventListener('mousedown',function(e){
			dragFlag=true;
			this.classList.remove('tansLft');
		})
		document.addEventListener('mouseup',function(e){
			if(dragFlag){
				dragFlag=false;
				_this.moveTo(e.clientX-_this.slidLft);
			}
		})
		_this.axis.parentNode.addEventListener('mousemove',function(e){
			if(dragFlag){
				var curPos = e.clientX-_this.slidLft-document.body.offsetLeft;
				var maxX = _this.axis.parentNode.offsetWidth-_this.slidBlock.offsetWidth;
				if(curPos>0&&curPos<maxX){
					_this.slidBlock.style.left = curPos+'px';
					_this.proBar.style.width = curPos+'px';
				}
			}
		})
		/*End 为pc添加的事件*/
	},
	creatAxis:function(){
		var ary = this.xArry
		var xAlen = ary.length;
		for(var i = 0 ;i<xAlen;i++){
			var tmpLi = document.createElement('li')
			tmpLi.innerHTML = ary[i]>10000?ary[i]/10000+'万':ary[i]
			this.axis.appendChild(tmpLi);
		}
		var lis = this.axis.querySelectorAll('li');
		var blockWhalf = this.slidBlock.offsetWidth/2;
		var stop = 0;
		this.stopAry = [];
		this.stopAry.push(stop)
		for(var i = 1;i<xAlen;i++){
			if(i==xAlen-1){
				stop = lis[i].offsetLeft+lis[i].offsetWidth-blockWhalf*2;
			}else{stop = lis[i].offsetLeft+lis[i].offsetWidth/2-blockWhalf;}
			this.stopAry.push(stop)
		}
	},
	moveTo:function(pos){
		var dec = 999999;
		var posFlag;
		for(var i = 0;i<this.stopAry.length;i++){		
			if(Math.abs(pos - this.stopAry[i])<dec){
				dec = Math.abs(pos - this.stopAry[i])
				posFlag = i;
			}
		}
		//posFlag = pos>this.stopAry[posFlag]?posFlag+1:posFlag;
		this.slidBlock.classList.add('tansLft');
		this.proBar.classList.add('tansW');
		this.slidBlock.style.left=this.stopAry[posFlag]+'px';
		this.proBar.style.width = this.stopAry[posFlag]+'px';
		/*计算并改变提示值*/
		this.curNum.innerHTML = this.xArry[posFlag];
		this.profit.innerHTML = (this.xArry[posFlag]*(1+parseFloat(this.percent))).toFixed(2);
	}
}