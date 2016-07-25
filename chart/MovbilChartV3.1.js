function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
	// 如果最后的节点是目标元素，则直接添加。因为默认是最后
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
	}
} 
function preventDefault(e){/*阻止默认事件*/
	var e = e || window.event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}

function shareChart(chart){
	this.init=function(){
console.log("V3.1")
		_this = this;
		this.Data = chart.Data;

		this.lineType=chart.lineType;
		switch(this.lineType){
			case 'hk':
				this.BaseXPer = 332,
				this.VolCuntDec = 2;
				break;
			case 'as':
				this.BaseXPer = 242,
				this.VolCuntDec = 2;
				break;
			case 'as5':
				this.BaseXPer = 242*5,
				this.VolCuntDec = 4;
				break;
			default:
				this.BaseXPer = 242,
				this.VolCuntDec = 2;
				break;
		}		

		this.ChartCanv=document.getElementById(chart.CavId);
		this.context = this.ChartCanv.getContext("2d");
		
		//图表基本
		this.originX = chart.LeftSpace,
		this.originY = chart.TopSpace,
		this.prcAreMaxX = this.originX + chart.PrcAreW,
		this.prcAreMaxY = this.originY + chart.PrcAreH,
		this.prcCellH = chart.PrcAreH/4;

		//价格分割线
		this.prcY1 = this.originY+this.prcCellH,
		this.prcY2 = this.originY+this.prcCellH*2,
		this.prcY3 = this.originY+this.prcCellH*3,
		this.prcY4 = this.originY+chart.PrcAreH-1;

		//成交量相关区域
		this.volBoxY=this.originY+chart.PrcAreH+chart.TimLnH,
		this.volMaxX=this.originX+chart.VolAreW;

		//时间轴y坐标
		this.TimY = this.originY+chart.PrcAreH+20;

		this.creatDataLay();
		this.DrawBase();
		//this.DrawCoordinate();
		this.DrawData(this.Data);
		//this.addEv(_this);
	}
	this.creatDataLay = function(){
		//创建绘制数据层的canvas
		this.baseLay = document.getElementById(chart.CavId);
		this.dataLay = document.createElement("canvas");
		this.dataLay.id=chart.CavId+"_data";
		this.dataLay.width=chart.CavW;
		this.dataLay.height=chart.CavH;
		this.dataLay.style.width = this.baseLay.offsetWidth;
		this.dataLay.style.height = this.baseLay.offsetHeight;
		this.dataLay.setAttribute("style","width:"+(this.baseLay.offsetWidth)+"px;height:"+this.baseLay.offsetHeight+"px;position:absolute;top:"+this.baseLay.offsetTop+"px;left:"+(this.baseLay.offsetLeft)+"px;");
		insertAfter(this.dataLay, this.baseLay);
		this.datacontext = this.dataLay.getContext("2d");
	};
	this.DrawBase = function(){
		//alert(1)
		/*中心平移法画细线，解决线粗的问题*/
		this.context.save();
		this.context.translate(0.5,0.5);
		this.context.lineWidth = 1;
		this.context.strokeStyle=chart.HorLineColor;
		this.context.beginPath();

		//画单元格横线，单元格宽52 高44  价格横线
		//最高
		this.context.moveTo(this.originX,this.originY);
		this.context.lineTo(this.prcAreMaxX,this.originY);
		//涨一
		this.context.moveTo(this.originX,this.prcY1);
		this.context.lineTo(this.prcAreMaxX,this.prcY1);
		//昨收价
		this.context.moveTo(this.originX,this.prcY2);
		this.context.lineTo(this.prcAreMaxX,this.prcY2);
		//跌一
		this.context.moveTo(this.originX,this.prcY3);
		this.context.lineTo(this.prcAreMaxX,this.prcY3);
		//最低
		this.context.moveTo(this.originX,this.prcY4);
		this.context.lineTo(this.prcAreMaxX,this.prcY4);
		this.context.stroke();

		//成交量框
		this.context.strokeStyle=chart.VolBoxColor;
		this.context.beginPath();		
		this.context.moveTo(this.originX,this.volBoxY);
		this.context.lineTo(this.volMaxX,this.volBoxY);
		this.context.lineTo(this.volMaxX,this.volBoxY+chart.VolAreH);
		this.context.lineTo(this.originX,this.volBoxY+chart.VolAreH);
		this.context.lineTo(this.originX,this.volBoxY);
		this.context.stroke();

		//时间轴坐标
		this.context.font="normal 20px Arial";
		this.context.fillStyle=chart.TimeColor;	
		if(this.lineType=="hk"||this.lineType=="as"){
			this.TimX1 = this.originX-4,
			this.TimX2 = this.originX+chart.PrcAreW/2-this.context.measureText(chart.XTxt[1]).width/2;
			this.TimX3 = this.originX+chart.PrcAreW-this.context.measureText(chart.XTxt[2]).width;
			this.context.fillText(chart.XTxt[0],this.TimX1,this.TimY);
			this.context.fillText(chart.XTxt[1],this.TimX2,this.TimY);
			this.context.fillText(chart.XTxt[2],this.TimX3,this.TimY);
		}else if(this.lineType=="as5"){
			//五日线日期
			//文字中线对准当日开盘数据
			// this.DayX0 = this.originX-20,
			// this.DayX1 = this.originX+chart.PrcAreW/5-20,
			// this.DayX2 = this.originX+chart.PrcAreW/5*2-20,
			// this.DayX3 = this.originX+chart.PrcAreW/5*3-20,
			// this.DayX4 = this.originX+chart.PrcAreW/5*4-20;

			//文字左侧对准当日开盘数据
			this.DayX0 = this.originX,
			this.DayX1 = this.originX+chart.PrcAreW/5,
			this.DayX2 = this.originX+chart.PrcAreW/5*2,
			this.DayX3 = this.originX+chart.PrcAreW/5*3,
			this.DayX4 = this.originX+chart.PrcAreW/5*4;

			this.context.fillText(chart.XTxt[0],this.DayX0,this.TimY);
			this.context.fillText(chart.XTxt[1],this.DayX1,this.TimY);
			this.context.fillText(chart.XTxt[2],this.DayX2,this.TimY);
			this.context.fillText(chart.XTxt[3],this.DayX3,this.TimY);	
			this.context.fillText(chart.XTxt[4],this.DayX4,this.TimY);
		}

	};
	this.DrawCoordinate=function(Data){
		
		//价格及涨跌幅坐标准备
		this.datacontext.font="normal 20px Arial";
		this.datacontext.textAlign="right";
		this.datacontext.fillStyle=chart.UpColor;
		this.prcTxtX = this.originX-8;
		
		this.riseHt  = (Data.high - Data.last)>(Data.last - Data.low)?true:false;//判断涨幅是否大于跌幅
		this.higDfr = (Data.high - Data.last)>(Data.last - Data.low)?(Data.high - Data.last):(Data.last - Data.low);
		
		this.prcH = this.riseHt?Data.high:Data.last+this.higDfr;
		this.prcH2 = (this.prcH - Data.last)/2 + Data.last;
		this.prcL = parseFloat( this.riseHt?(Data.last-this.higDfr):Data.low);
		this.prcL2 = Data.last - (Data.last-this.prcL)/2;
		//价格坐标	
		//最高
		this.datacontext.fillText(this.prcH.toFixed(2),this.prcTxtX,this.originY+8);
		//涨一
		this.datacontext.fillText(this.prcH2.toFixed(2),this.prcTxtX,this.prcY1+4);
		//昨收
		this.datacontext.fillStyle=chart.LasColor;
		this.datacontext.fillText(Data.last,this.prcTxtX,this.prcY2+4);
		//跌一
		this.datacontext.fillStyle=chart.DownColor;
		this.datacontext.fillText(this.prcL2.toFixed(2),this.prcTxtX,this.prcY3+4);
		//最低
		this.datacontext.fillText(this.prcL.toFixed(2),this.prcTxtX,this.prcY4);
			
		//涨跌幅坐标
		this.datacontext.textAlign="left";
		this.datacontext.fillStyle=chart.UpColor;
		this.risePerH = (((this.prcH - Data.last)/Data.last) * 100).toFixed(2) +'%',
		this.risePerH2 = (((this.prcH2 - Data.last)/Data.last) * 100).toFixed(2) +'%',
		this.risePerL = '- '+(((Data.last - this.prcL)/Data.last) * 100).toFixed(2) +'%',
		this.risePerL2 = '- '+(((Data.last - this.prcL2)/Data.last) * 100).toFixed(2) +'%';
		this.riseTxtX = this.originX + chart.PrcAreW + 8;
		//最高
		this.datacontext.fillText(this.risePerH,this.riseTxtX,this.originY+8);
		//涨一
		this.datacontext.fillText(this.risePerH2,this.riseTxtX,this.prcY1+4);
		//昨收
		this.datacontext.fillStyle=chart.LasColor;
		this.datacontext.fillText(''+'0.00%',this.riseTxtX,this.prcY2+4);
		//跌一
		this.datacontext.fillStyle=chart.DownColor;
		this.datacontext.fillText(this.risePerL2,this.riseTxtX,this.prcY3+4);
		//最低
		this.datacontext.fillText(this.risePerL,this.riseTxtX,this.prcY4);

		//成交量坐标
		this.datacontext.textAlign="right";
		this.datacontext.fillStyle=chart.LasColor;
		this.datacontext.fillText(Data.volMax,this.prcTxtX,this.volBoxY+8);
		this.datacontext.fillText('万手 0',this.prcTxtX,this.volBoxY+chart.VolAreH);
	};

	this.DrawData=function(Data){
		//清除画布
		this.datacontext.clearRect(0,0,chart.CavW,chart.CavH);
		this.DrawCoordinate(Data);

		//价格线、均线、成交量对应的Y坐标值计算
		//this.prcY = new Array();
		this.prcY = [];
		this.avY = [];
		this.volY = [];//[成交量顶端y坐标,颜色标识]
		this.showData=[];//[[时间，价格,均价,涨跌幅,成交量],....]用于鼠标滑过展示数据
		for(var i=0;i<Data.timShr.length;i++){
			var tmpUpPer = ((Data.timShr[i][1]-Data.last)*100/Data.last).toFixed(2);

			var tmpPrcY = (this.prcH-Data.timShr[i][1])/(this.prcH-this.prcL)*chart.PrcAreH+this.originY,
				tmpAvY = (this.prcH-Data.timShr[i][2])/(this.prcH-this.prcL)*chart.PrcAreH+this.originY,
				tmpVolY = (chart.VolAreH-Data.timShr[i][3]*chart.VolAreH/Data.volMax)+this.volBoxY;

			this.prcY[this.prcY.length] = tmpPrcY.toFixed(1);
			this.avY[this.avY.length] = tmpAvY.toFixed(1);
			this.volY[this.volY.length] = [tmpVolY.toFixed(1),Data.timShr[i][4]];

			this.showData.push([Data.timShr[i][0],Data.timShr[i][1],Data.timShr[i][2],tmpUpPer,Data.timShr[i][3]]);
		}
		//价格线
		this.datacontext.strokeStyle=chart.PricLineColor;
		this.datacontext.lineWidth=2;
		this.datacontext.beginPath();
		this.datacontext.moveTo(this.originX,this.prcY[0]);
		for(var i = 0;i<this.prcY.length;i++){
			//if(i%2==0){//为防止线画的太挤，将数据量减少至三分之一
				this.datacontext.lineTo(this.originX+(chart.PrcAreW/this.BaseXPer)*i,this.prcY[i]);
			//}
		}
		this.datacontext.stroke();
		/*填充阴影*/
		var gradient = this.datacontext.createLinearGradient(0,0,0,290);
		gradient.addColorStop(0,'rgba(114,192,247,0.7)');
		gradient.addColorStop(1,'rgba(114,192,247,0.1)');
		//context.fillStyle="rgba(114,192,247,0.5)";
		this.datacontext.fillStyle=gradient;
		this.datacontext.lineTo(this.originX+(chart.PrcAreW/this.BaseXPer)*(this.prcY.length-1),this.prcY4);
		this.datacontext.lineTo(this.originX,this.prcY4);
		this.datacontext.fill();
		
		//均线
		this.datacontext.strokeStyle=chart.AvrLinColor;
		this.datacontext.beginPath();
		this.datacontext.moveTo(this.originX,this.avY[0]);
		for(var i = 0;i<this.avY.length;i++){
			if(i%3==0){//为防止线画的太挤，将数据量减少至三分之一
				this.datacontext.lineTo(this.originX+(chart.PrcAreW/this.BaseXPer)*i,this.avY[i]);	
			}
		}
		this.datacontext.stroke();
		
		//成交量
		this.datacontext.lineWidth=2;
		this.volBotY = this.volBoxY+chart.VolAreH;
		for(var i = 0;i<this.volY.length;i++){
			if(i%this.VolCuntDec==0){//为防止线画的太挤，将数据量减少至三分之一
				this.datacontext.beginPath();//防止颜色覆盖，每条线都重新开启新的路径
				this.datacontext.strokeStyle=this.volY[i][1]=='1'?chart.VolUpCor:chart.VolDownCor;
				this.datacontext.moveTo(this.originX+(chart.PrcAreW/this.BaseXPer)*i,this.volY[i][0]);
				this.datacontext.lineTo(this.originX+(chart.PrcAreW/this.BaseXPer)*i,this.volBotY);
				this.datacontext.stroke();
			}
		}
		//this.dataLay.onTouchMove =null;
		this.dataLay.removeEventListener('touchmove',_this.movEv, false);
		this.addEv(this);
	};

	this.addEv=function(_this){
		_this.movEv = function (ev){
			var ev = ev||window.event;
			//此处this指向已经变为dataLay
			preventDefault(ev);
			var scrTop = document.body.scrollTop,
				canvH = this.offsetHeight,
				canvW = this.offsetWidth,
				evYofCanv = ev.touches[0].clientY-this.offsetTop+scrTop,
				evXofCanv = ev.touches[0].clientX-this.offsetLeft;
			//有效范围,坐标是相对于页面 而非canvas
			//var minX=canvW*90/640,
			//	maxX=canvW*(470+90)/640;
			var minX=canvW*chart.LeftSpace/chart.CavW,
				maxX=canvW*(chart.PrcAreW+chart.LeftSpace)/chart.CavW;

			//if(0<evYofCanv&&evYofCanv<canvH&&0<evXofCanv&&evXofCanv<canvW){
			if(0<evYofCanv&&evYofCanv<canvH&&minX<evXofCanv&&evXofCanv<maxX){
				//console.log("范围内")
				var tmpChart = document.getElementById(this.id+"tmp");
				var dataInd;
				if(!tmpChart){
					var tmpChart = document.createElement("div");

					var tmpVline = document.createElement("p");
					var tmpHline = document.createElement("p");
					var tmpLftTxt = document.createElement("span");
					var tmpRgtTxt = document.createElement("span");
					var tmpTimeTxt = document.createElement("span");

					tmpChart.id=this.id+"tmp";

					tmpChart.className="chartEvent";
					tmpChart.setAttribute("style","width:"+(this.offsetWidth)+"px;height:"+this.offsetHeight+"px;top:"+this.offsetTop+"px;left:"+(this.offsetLeft)+"px;");

					var hLineTop,vLineLft;
					vLineLft=evXofCanv;
					dataInd = Math.floor((evXofCanv-minX)*_this.BaseXPer/(maxX-minX));

					if(dataInd>_this.showData.length-1) {
						dataInd=_this.showData.length-1;
						vLineLft = dataInd*(maxX-minX)/_this.BaseXPer+minX;
					}

					hLineTop = _this.prcY[dataInd]*this.offsetHeight/this.height;
					tmpHline.className="horLine";
					tmpHline.setAttribute("style","width:"+(this.offsetWidth)+"px;top:"+hLineTop+"px;");

					tmpVline.className="vLine";
					tmpVline.setAttribute("style","height:"+this.offsetHeight+"px;left:"+vLineLft+"px;");

					tmpLftTxt.setAttribute("style","left:0px;"+"top:"+hLineTop+"px;");
					tmpLftTxt.innerHTML=_this.showData[dataInd][1];

					tmpRgtTxt.setAttribute("style","right:0px;"+"top:"+hLineTop+"px;");
					tmpRgtTxt.innerHTML=_this.showData[dataInd][3]+"%";

					tmpTimeTxt.setAttribute("style","bottom:0px;"+"left:"+(vLineLft-20)+"px;");
					tmpTimeTxt.innerHTML=_this.showData[dataInd][0];

					tmpChart.appendChild(tmpVline);
					tmpChart.appendChild(tmpHline);
					tmpChart.appendChild(tmpLftTxt);
					tmpChart.appendChild(tmpRgtTxt);
					tmpChart.appendChild(tmpTimeTxt);

					insertAfter(tmpChart, this);


				}else{
					//tmpChart清空数据
					//tmpChart根据新位置重画
					var tmpVline = tmpChart.getElementsByTagName("p")[0];
					var tmpHline = tmpChart.getElementsByTagName("p")[1];
					var tmpLftTxt = tmpChart.getElementsByTagName("span")[0];
					var tmpRgtTxt = tmpChart.getElementsByTagName("span")[1];
					var tmpTimeTxt = tmpChart.getElementsByTagName("span")[2];

					var hLineTop,vLineLft;
					vLineLft=evXofCanv;
					dataInd = Math.floor((evXofCanv-minX)*_this.BaseXPer/(maxX-minX));

					if(dataInd>_this.showData.length-1) {
						dataInd=_this.showData.length-1;
						vLineLft = dataInd*(maxX-minX)/_this.BaseXPer+minX;
					}
					hLineTop = _this.prcY[dataInd]*this.offsetHeight/this.height;
					tmpHline.setAttribute("style","width:"+(this.offsetWidth)+"px;top:"+hLineTop+"px;");
				
					tmpVline.setAttribute("style","height:"+this.offsetHeight+"px;left:"+vLineLft+"px;");

					tmpLftTxt.setAttribute("style","left:0px;"+"top:"+hLineTop+"px;");
					tmpLftTxt.innerHTML=_this.showData[dataInd][1];

					tmpRgtTxt.setAttribute("style","right:0px;"+"top:"+hLineTop+"px;");
					tmpRgtTxt.innerHTML=_this.showData[dataInd][3]+"%";

					tmpTimeTxt.setAttribute("style","bottom:0px;"+"left:"+(vLineLft-20)+"px;");
					tmpTimeTxt.innerHTML=_this.showData[dataInd][0];
				}
			}
		};

		this.dataLay.addEventListener('touchmove',_this.movEv, false);

		this.dataLay.addEventListener('touchend',function(ev){
			var tmpChart =  document.getElementById(this.id+"tmp");
			if(tmpChart){
				//删除临时canvas
				tmpChart.parentNode.removeChild(tmpChart)
			}
		},false)
	};
};

function ConectTo(result,chart){
	if(result.list.length>0){
		chart.Data.last = result.stock;
		var list = result.list;
		chart.XTxt=[];
		switch(chart.lineType){
			case 'hk':
				chart.XTxt.push("9:30","12:00/13:00","16:00");
			break;
			case 'as':
				chart.XTxt.push("9:30","11:30/13:00","15:00");
				break;
			case 'hk5':;
			case 'as5':
				var day1 = new Date(list[0][0]*1000),
					day2 = new Date(list[250][0]*1000),
					day3 = new Date(list[500][0]*1000),
					day4 = new Date(list[740][0]*1000),
					day5 = new Date(list[list.length-1][0]*1000);
					chart.XTxt.push((day1.getMonth()+1)+"月"+day1.getDate(),(day2.getMonth()+1)+"月"+day2.getDate(),(day3.getMonth()+1)+"月"+day3.getDate(),(day4.getMonth()+1)+"月"+day4.getDate(),(day5.getMonth()+1)+"月"+day5.getDate());
				break;
			default:
			chart.lineType = 'as';
			chart.XTxt.push("9:30","11:30/13:00","15:00");
			break;
		}

		for(var i = 0;i<list.length;i++){
			/*var prc = list[i][1],
				avprc = list[i][2],
				vol = list[i][4],
				corflg = list[i][6]=='1'?1:0;*/
			/*因接口返回数据都是字符串，这里转化成数值*/
			var tmpDate = new Date(list[i][0]*1000),
				tmpHor = tmpDate.getHours()<10?"0"+tmpDate.getHours():tmpDate.getHours(),
				tmpMin = tmpDate.getMinutes()<10?"0"+tmpDate.getMinutes():tmpDate.getMinutes(),
				time = tmpHor+":"+tmpMin,
				prc = parseFloat(list[i][1]),
				avprc = parseFloat(list[i][2]),
				vol = parseFloat(list[i][4]),
				corflg = list[i][6]=='1'?1:0;		
			chart.Data.high = chart.Data.high>prc?chart.Data.high:prc;
			chart.Data.low = chart.Data.low<prc?chart.Data.low:prc;
			if(!isNaN(vol)) chart.Data.volMax = chart.Data.volMax>vol?chart.Data.volMax:vol;
			chart.Data.timShr.push([time,prc.toFixed(2),avprc,vol,corflg]);

		}

		//DrwChart(chart);
		var sChart = new shareChart(chart);
		sChart.init();
	}
	return sChart;
};

function reDraw(result,sChart){
	var Data={
			high:0,
			low:99999999999,
			last:0,
			volMax:0,
			timShr:[]//[[时间,价格，均价，成交量,成交量颜色标志],[]……]
		};
	if(result.list.length>0){
		Data.last = result.stock;
		var list = result.list;
		for(var i = 0;i<list.length;i++){
			/*var prc = list[i][1],
				avprc = list[i][2],
				vol = list[i][4],
				corflg = list[i][6]=='1'?1:0;*/
			/*因接口返回数据都是字符串，这里转化成数值*/
			var tmpDate = new Date(list[i][0]*1000),
				tmpHor = tmpDate.getHours()<10?"0"+tmpDate.getHours():tmpDate.getHours(),
				tmpMin = tmpDate.getMinutes()<10?"0"+tmpDate.getMinutes():tmpDate.getMinutes(),
				time = tmpHor+":"+tmpMin,
				prc = parseFloat(list[i][1]),
				avprc = parseFloat(list[i][2]),
				vol = parseFloat(list[i][4]),
				corflg = list[i][6]=='1'?1:0;
			
			Data.high = Data.high>prc?Data.high:prc;
			Data.low = Data.low<prc?Data.low:prc;
			if(!isNaN(vol)) Data.volMax = Data.volMax>vol?Data.volMax:vol;
			Data.timShr.push([time,prc.toFixed(2),avprc,vol,corflg]);
		}
		sChart.DrawData(Data);
	}
}