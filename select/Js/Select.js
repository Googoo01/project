function preventDefault(e){/*阻止默认事件*/
	var e = e || window.event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}
/*
*@parameter selects's names splited by ‘,’
*example:Selects('AA','BB');AA is a select's name,BB is another select's name
*/
function Selects(){
	function SetSlct(){
		SetSlct.prototype = {
			Init:function(o){
				var NwS =o;
				NwS.Nam = o.name;
				NwS.IsMlt =o.multiple;
				NwS.InpCls = o.className;
				NwS.LsCkI = 0;//记录最后一次被点击选项的索引
				NwS.Pr = o.parentNode;
				NwS.Inp = this.SetInpt(NwS);
				NwS.Sub = this.SetSub(NwS);
				NwS.Btn = this.SetBtn(NwS);
				
				NwS.Pr.insertBefore(NwS.Sub,NwS);
				if(NwS.Inp){
					NwS.Pr.insertBefore(NwS.Inp,NwS);
				}
				if(NwS.Btn){
					NwS.Pr.insertBefore(NwS.Btn,NwS);
				}
				NwS.style.display = 'none';
				this.SetCur(NwS);
			},
			SetInpt:function(Obj){/*设置新的显示框*/
				var TemInpt;
				if(Obj.IsMlt){
					TemInpt = null;
					return TemInpt;
				}
				TemInpt = document.createElement('input');
				TemInpt.className = Obj.InpCls;
				TemInpt.setAttribute('type', 'text');
				TemInpt.setAttribute('autocomplete', 'off');
				TemInpt.setAttribute('readonly', 'readonly');
				/*键盘事件的起始、终止位置*/
				LasInd = Obj.LsCkI;
				CuInd = Obj.LsCkI;
				
				C.AddEvent(TemInpt,'mousedown',SetSlct.prototype.TogSub,Obj);				
				/*Add 2013-6-18  for sub close*/
				C.AddEvent(TemInpt,'mouseleave',SetSlct.prototype.SetTimr,Obj);
				C.AddEvent(TemInpt,'mouseover',SetSlct.prototype.ClnrTimr,Obj);

				
				/*添加键盘事件*/
				C.AddEvent(TemInpt,'keydown',function(e){
					var e = e || window.event,
						EvTarg = e.target || e.srcElement,
						Lis = C.Gs(Obj.Sub,'li'),/*所有选项集合*/
						LisLe = Lis.length;
					switch(e.keyCode){
						case 38:/*up*/
							LasInd = CuInd;
							if(CuInd == 0){
								CuInd = LisLe - 1;
							}else{
								CuInd--;
							}
							SetSlct.prototype.OptMovr(e,Lis[CuInd]);
							SetSlct.prototype.OptMout(e,Lis[LasInd]);
							break;
						case 40:/*down*/
							LasInd = CuInd;
							if(CuInd == LisLe - 1){
								CuInd = 0;
							}else{
								CuInd++;
							}
							SetSlct.prototype.OptMovr(e,Lis[CuInd]);
							SetSlct.prototype.OptMout(e,Lis[LasInd]);					
							break;
						case 13:/*enter*/
							if(Obj.Sub.style.visibility == 'hidden'||Obj.Sub.style.visibility == ''){
								SetSlct.prototype.ShwSub(Obj);
							}else{
								SetSlct.prototype.OptCh(e,{'Obj':Obj,'Tag':Lis[CuInd]});	
							}
							preventDefault(e);/*取消默认事件*/
							break;
						case 27: /*escape*/
							if(Obj.Sub.style.visibility == 'visible'){
								SetSlct.prototype.HidSub(Obj);	
								/*删除当前项鼠标滑过效果，重置键盘事件起始位置*/
								C.DelClass(Lis[CuInd],'Cur');
								CuInd = Obj.LsCkI;
							}
							preventDefault(e);/*取消默认事件*/
							break;
					}
				})
				return TemInpt;	
			},
			SetBtn:function(Obj){/*设置下拉按钮*/
				var TemBt;
				if(Obj.IsMlt){
					TemBt = null;
					return TemBt;
				}
				TemBt = document.createElement('span');
				Obj.BtnCls = Obj.InpCls.substr(0,3) + 'Btn';
				TemBt.className = Obj.BtnCls;
				C.AddEvent(TemBt,'mousedown',SetSlct.prototype.TogSub,Obj);
				return TemBt;
			},
			SetSub:function(Obj){/*生成新的下拉菜单*/
				var TemSub = document.createElement('ul');
				var Opts = C.Gs(Obj,'option');
				
				if(Obj.IsMlt){/*如果是多选框，生成的ul直接使用select的类名*/
					TemSub.className = Obj.InpCls;
				}else{/*如果是单选则使用sub类名*/
					Obj.SubCls = Obj.InpCls.substr(0,3) + 'Sub';
					TemSub.className = Obj.SubCls;
				
					/*Add 2013-6-18  for sub close*/
					C.AddEvent(TemSub,'mouseover',SetSlct.prototype.ClnrTimr,Obj);
					C.AddEvent(TemSub,'mouseleave',SetSlct.prototype.SetTimr,Obj);
					
				}
					
				/*将所有的选项转换成li列表*/
				for(var i=0,l=Opts.length;i<l;i++){
					var OpCls = Opts[i].className,
						SltFlag = Opts[i].selected,
						OpVal = Opts[i].value,
						OpTxt = Opts[i].text,
						LiTxtNd = document.createTextNode(OpTxt);
					var TemLi = document.createElement('li');
					TemLi.appendChild(LiTxtNd);
					if(OpCls){/*将option的class付给对应li*/
						TemLi.className = OpCls;
					}
					if(SltFlag){/*如果option已经被选中，则将对应li设置为选中样式*/
						C.AddClass(TemLi,'Slcted');
					}
					TemLi.Ind = i;
					
					/*为li添加点击事件*/
					C.AddEvent(TemLi,'mousedown',SetSlct.prototype.OptCh,{'Obj':Obj});
					/*给Li添加鼠标滑过及离开事件，for ie6;*/
					C.AddEvent(TemLi,'mouseover',SetSlct.prototype.OptMovr);
					C.AddEvent(TemLi,'mouseout',SetSlct.prototype.OptMout);
					TemSub.appendChild(TemLi);
				}
				
				/*初始时若没有被选项,则将第一项默认选中*/
				if(C.Cls('Slcted','li',TemSub).length==0){				
					C.AddClass(C.Gs(TemSub,'li')[0],'Slcted');
				}
				/*单选且非ie6鼠标离开下拉菜单时关闭，由于ie6中阻止冒泡失效，所以ie6不添加此事件*/
				/*var Ie6 = false;
				if(document.all){
					var BroVer=navigator.appVersion;
					var Ver=BroVer.split(";"); 
					var TriVer=Ver[1].replace(/[ ]/g,"");
					if(TriVer =="MSIE6.0") { 
						Ie6=true;
					}
				}
				if(!Obj.IsMlt&&!Ie6){
					TemSub.onmouseout = function(e){
						SetSlct.prototype.HidSub(Obj);
					}
				}*/

				return TemSub;				
			},
			OptMout:function(e,Tag){/*选项的鼠标离开事件*/
				var e = e || window.event;
				var EvTarg =Tag || e.target || e.srcElement;
				C.DelClass(EvTarg,'Cur');
				/*阻止事件冒泡，ie6无效*/
				C.StopBubble(e);
			},
			OptMovr:function(e,Tag){/*选项的鼠标滑过事件*/
				var EvTarg = Tag || e.target || e.srcElement;
				C.AddClass(EvTarg,'Cur');
			},
			OptCh:function(e,Arg){/*选项的点击事件*/
				var Obj = Arg['Obj'];
				var e = e || window.event,
					EvTarg = Arg['Tag'] || e.target || e.srcElement,/*获取被点击对象*/
					MouLVal = 0,/*鼠标左键的值*/
					CurLs = C.Cls('Slcted','li',Obj.Sub),/*获取所有已选项*/
					Lis = C.Gs(Obj.Sub,'li');/*所有选项集合*/
					
				/*根据鼠标事件设置li的选中样式*/
				if((!e.ctrlKey&&!e.shiftKey)||!Obj.IsMlt){/*如果没按下多选功能键或者该selecte是单选，设置当前样式同时删除其他选项的当前样式*/
					for(var i = 0,l = CurLs.length;i<l;i++){
						C.DelClass(CurLs[i],'Slcted');
					}
					C.AddClass(EvTarg,'Slcted');
				}else{/*如果多选且按下了多选功能键，则添加ctrl及shift键判断实现多选*/
					if(document.all){/*ie9以下版本将鼠标左键值修改为1*/
						var BroVer=navigator.appVersion;
						var Ver=BroVer.split(";"); 
						var TriVer=Ver[1].replace(/[ ]/g,"");
						if(TriVer!="MSIE9.0") { 
							MouLVal = 1;
						}
					}
					if (e.ctrlKey&&(e.button==MouLVal)) {  /*ctrl+鼠标左键,显示或隐藏该项的被选效果*/
						if(EvTarg.className.indexOf('Slcted')==-1){
							C.AddClass(EvTarg,'Slcted');
						}else{
							C.DelClass(EvTarg,'Slcted');
						}
					}
					if (e.shiftKey&&(e.button==MouLVal)) {/*shift+鼠标左键，选中上一次点击的选项到该选项之间的所有项*/
						for(var i = 0,l = CurLs.length;i<l;i++){/*清除已被选中项样式*/
							C.DelClass(CurLs[i],'Slcted');
						}
						if(EvTarg.Ind<=Obj.LsCkI){/*根据起始值设定选项*/
							for(var i = EvTarg.Ind; i <= Obj.LsCkI;i++){
								C.AddClass(Lis[i],'Slcted');
							}
						}else{
							for(var i = EvTarg.Ind; i >= Obj.LsCkI;i--){
								C.AddClass(Lis[i],'Slcted');
							}
						}
					}
				}
				Obj.LsCkI = EvTarg.Ind;/*修改最后点击项索引*/
				SetSlct.prototype.SetCur(Obj);/*设置被选项状态*/
				if(!Obj.IsMlt){/*如果是单选,点击后关闭菜单*/
					SetSlct.prototype.HidSub(Obj);
				}
								
				/*调用select的change事件*/
				if(Obj.onchange){
					Obj.onchange();
				}
			},
			
			/*Add 2013-6-18 for sub close*/			
			SetTimr:function(e,Obj){
				Obj.Timr = setTimeout(function(){SetSlct.prototype.HidSub(Obj);},800);
			},
			ClnrTimr:function(e,Obj){
				clearTimeout(Obj.Timr);
			},

			TogSub:function(e,Obj){/*切换子项的可见性*/
				if(Obj.Sub.style.visibility == 'visible'){
					SetSlct.prototype.HidSub(Obj);
				}else{
					SetSlct.prototype.ShwSub(Obj);
				}
			},
			ShwSub:function(Obj){/*打开子菜单*/
				Obj.Sub.style.visibility = 'visible';
				/*调整选项菜单的位置*/
				Obj.Sub.style.left = Obj.Inp.offsetLeft +'px';
				Obj.Sub.style.top = Obj.Inp.offsetTop + Obj.Inp.offsetHeight + 'px';
			},
			HidSub:function(Obj){/*关闭子菜单*/
				Obj.Sub.style.visibility = 'hidden';
			},
			SetCur:function(Obj,Ind){/*设置选中项*/
				var Opts = C.Gs(Obj,'option'),
				 	Lis = C.Gs(Obj.Sub,'li');			
				if(Ind!=null){/*若指定了索引，则将指定项设为选中*/
					if(!Obj.IsMlt){
						Obj.Inp.value = Opts[Ind].text;
					}
					Opts[Ind].selected=true;
				}else{/*若没指定索引，清除已选项，根据li样式重新设置*/
					for(var i = 0,l = Opts.length;i<l;i++){
						if(Opts[i].selected){
							Opts[i].selected=false;
						}
					}
					for(var i = 0,l = Lis.length;i<l;i++){
						if(Lis[i].className&& Lis[i].className.indexOf('Slcted') != -1){
							this.SetCur(Obj,i);
						}
					}
				}
			}			
		}
		C.Batch();	
	}
	/*初始化参数并将参数对应的select进行重新设置*/
	var Nms = Array.prototype.slice.apply(arguments);
	for(var i = 0,l = Nms.length;i < l;i++){
		var Slcts = C.Gsn(Nms[i]);
		for(var j = 0, le = Slcts.length;j<le;j++){
			SetSlct(Slcts[j]);
		}
	}
}