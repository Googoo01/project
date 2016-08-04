!function(){
    /*滑块*/
    var axisArry=[0,3000,5000,20000,50000]
    var percent = 0.5;
    var sliderObj= new slider({id:'slider',axisArry:axisArry,percent:percent});
    sliderObj.init();
    /*End 滑块调用*/

    /*曲线图*/
    var SqirMap=new chartsGloabalMap('mainMap');
        SqirMap.createLine({
        topic:'股票变化',//名称
        rollerX:['7月11日','7月12日','7月13日','7月14日','7月15日','7月16日','7月17日'],//横轴数据
        arrData:[10.45,40.85,20.34,60.24,40.24,90.34,50.34],//曲线7个点的数值
        rollerY:[0,20,40,60,80,100],//纵轴数据
        incomeValue:'125%',//收益数值
        completeColor:'#ef444c',//正收益的整个区域颜色
        localColor:'#f46d74'//正收益的整个区域颜色
    });   
    /*End 曲线图*/

    /*饼图*/
    pie({
        id:'pie',
        colors: ['#9cbafd','#ef444c','#55668c','#fdbd59','#5c7fcc','#739bf1'],
        ratio:[0.15,0.20,0.13,0.17,0.15,0.20],
        borderWidth:60,
        //borderCorlor: '#ccc',
        type:'doughnut',
        gap:6
    })
    /*End 饼图*/
}()

/*列表操作*/
!function(){
    var listItm = document.querySelector('.listContains').querySelectorAll('a');
    var listContent = document.querySelector('.listContent');
    var lists = listContent.querySelectorAll('ul');
    var listLft = 0,curList = 0,oldList = 0;
    var startX = -999,startY = -999,endX = -999,endY=-999;

    /*列表切换*/
    listContent.addEventListener('touchstart',function(e){
        var ev = e || window.event;
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
        listContent.classList.remove('transLft');
    })
    listContent.addEventListener('touchend',function(e){
        var ev = e || window.event;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var disX = endX-startX;
        if(disX<-40){
            ev.preventDefault();
            if(curList<2){
                show(++curList);
            }                    
        }else if(disX>40){
            ev.preventDefault();
            if(curList>0){
                show(--curList);
            }
        }
    })

    for(var i = 0,l = listItm.length;i<l;i++){
        listItm[i].ind = i;
    }
    document.querySelector('.listContains').addEventListener('touchend',function(e){
        var ev = e || window.event;
        show(ev.target.ind);
    })

    function show(ind){
        listContent.classList.add('transLft');
        listLft = ind*-7.5;
        listContent.style.marginLeft = listLft + 'rem';
        listItm[oldList].classList.remove('active');
        listItm[ind].classList.add('active');
        oldList = curList = ind;
        /*调整高度，防止加载跟多导致各列表高度不一而出现显示空白*/
        listContent.style.height = lists[curList].offsetHeight+'px';
    }
    /*End列表切换*/

    /*加载更多*/
    var loading = false;
    window.addEventListener('scroll',function(e){
        var currentPos = document.body.scrollTop+window.screen.height;
        if(currentPos==document.body.offsetHeight){
            if(!loading){
                loading=true;
                var tmpMor = document.createElement('li');
                tmpMor.classList.add('Mor');
                tmpMor.innerHTML= '加载更多';
                lists[curList].appendChild(tmpMor);
                listContent.style.height = lists[curList].offsetHeight+'px';
                loadingMor(lists[curList],function(){
                    lists[curList].removeChild(tmpMor);
                    listContent.style.height = lists[curList].offsetHeight+'px';
                });
            }
        }
    })
    function loadingMor(list,fn){
        if(!list.cunt){
            list.cunt = 0;
        }
        setTimeout(function(e){
            loading = false;
            var result = [{'avatar':'imgs/head.png',
                          'usrNm': '花花公子',
                          'usrLink':'http://3g.cnfol.com',
                          'comment':'Add_'+(list.cunt++)+'用户评价列表用表',
                          'commentLnk':'http://q.3g.cnfol.com/',
                          'time': '14:23:20'},
                          {'avatar':'imgs/head.png',
                          'usrNm': '花花公子',
                          'usrLink':'http://3g.cnfol.com',
                          'comment':'Add_'+(list.cunt++)+'用户评价列表用表',
                          'commentLnk':'http://q.3g.cnfol.com/',
                          'time': '14:23:20'},
                          {'avatar':'imgs/head.png',
                          'usrNm': '花花公子',
                          'usrLink':'http://3g.cnfol.com',
                          'comment':'Add_'+(list.cunt++)+'用户评价列表用表',
                          'commentLnk':'http://q.3g.cnfol.com/',
                          'time': '14:23:20'}]
            for(var i = 0 ,l=result.length;i<l;i++){
                var tmpLi = document.createElement('li');
                tmpLi.innerHTML='<a href="'+result[i].usrLink+'" class="avatar">'+
                    '<img src="'+result[i].avatar+'" alt="'+result[i].usrNm+'">'+
                '</a>'+
                '<a class="dect" href="'+result[i].commentLnk+'">'+
                    '<span class="experNm">'+result[i].usrNm+'</span>'+
                    '<p>'+result[i].comment+'</p>'+
                    '<span class="time">'+result[i].time+'</span>'+
                '</a>'
                lists[curList].appendChild(tmpLi);
            }
            fn&&fn();
        },1500)
    }
    /*End 加载更多*/
}()
/*End 列表操作*/