function setChart(option){
	var day = 1;
	var apiPage = 'chart.html';
	var upCl = "#ff0000";
	var downCl = "#06c871";
	switch(option.lineType){
		case 'hk5':
			day = 5;
			apiPage = 'hkchart.html';
			upCl = "#06c871";
			downCl = "#ff0000";
			break;
		case 'hk':
			apiPage = 'hkchart.html';
			upCl = "#06c871";
			downCl = "#ff0000";
			break;
		case 'as5':
			day = 5;
			break;
	}
	//分时图
	var chart = {
		CavId:option.id,
		UpColor:upCl,
		DownColor:downCl,
		LasColor:"#373737",
		PricLineColor:"#39a6fe",
		AvrLinColor:"#efc660",
		HorLineColor:"#c4e5ff",
		TimeColor:"#979797",
		VolBoxColor:"#bfbfbf",
		VolUpCor:"#ff2e2e",
		VolDownCor:"#3fb13e",	
		CavW:640,//同canvas宽高
		CavH:400,
		TopSpace:25,
		//LeftSpace:75,
		LeftSpace:90,
		//PrcAreW:480,/*建议242的整数倍*/
		PrcAreW:470,/*建议242的整数倍*/
		PrcAreH:265,
		TimLnH:38,
		VolAreH:70,
		//VolAreW:480,
		VolAreW:470,
		Data:{
			high:0,
			low:99999999999,
			last:0,
			volMax:0,
			timShr:[]//[[时间,价格，均价，成交量,成交量颜色标志],[]……]
		},
		XTxt:[],
		lineType:option.lineType//hk(港股一日)||as(a股一日)||hk5(港股五日)||as5(a股五日)
	}

	var sChart1;
	var quotes_api = option.api;
	var oldResult;
	var oldResultLen;
	var lstTime = 0;
	$.ajax({
		url: quotes_api + apiPage,
		cache: false,
		type: 'get',
		dataType: 'jsonp',
		jsonp: 'callback',
		data: {
			/* 固定服务号 */
			action: 'getrline',
			/* 操作类型 */
			stockid: option.stock,
			/* 用户ID */
			days:day
			/* 股票代码 */
			//lasttime: 1428371700
		},
		success: function(result)
		{
			oldResult = result;
			oldResultLen = result.list.length;
			lstTime = oldResult.list[oldResultLen-1][0]
			sChart1 = ConectTo(result,chart)
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			/* 请求异常根据自己需要处理 */
		}
	});

	var timer = setInterval(function(){
		$.ajax({
			//url: quotes_api + 'chart.html',
			url: quotes_api + apiPage,
			cache: false,
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			data: {
				/* 固定服务号 */
				action: 'getrline',
				/* 操作类型 */
				stockid: option.stock,
				/* 用户ID */
				days:day,
				/* 股票代码 */
				lasttime: lstTime
			},
			success: function(result)
			{				
				if(result.list){
					for(i in result.list){
						oldResult.list[oldResultLen] = result.list[i]
						oldResultLen++;
						lstTime = result.list[i][0];
					}
				}
				reDraw(oldResult,sChart1);
				//reDraw(result,sChart1)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown)
			{
				/* 请求异常根据自己需要处理 */
			}
		});	
	},30000)
}