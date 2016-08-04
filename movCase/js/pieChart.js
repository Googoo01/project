var pie = function(o){
    var dom = document.getElementById(o.id),
        isDoughnut = false;
        ctx = dom.getContext('2d'),
        ratio = o.ratio,
        colors = o.colors,
        borderW = o.borderWidth,
        borderCor = o.borderColor,
        type = o.type,
        center = Math.floor(dom.height/2), //圆心
        radius = center - (borderW || 0), //半径
        startAngle = Math.PI * 1.5,    //起始弧度
        endAngle = Math.PI * 1.5;     //结束弧度

    if(type=='doughnut'){
        isDoughnut=true;
        radius = center;
    }
    //填充底色，与边框同色
    ctx.fillStyle = o.borderCorlor || '#ffffff';
    ctx.arc(center, center, center, 0, Math.PI * 2, true);
    ctx.fill();

    //依次画出扇形
    var i = 0 ,l = ratio.length;
    var timer = setInterval(function(){
        if(i<l){
            endAngle = endAngle - ratio[i] * Math.PI * 2; //结束弧度        
            ctx.fillStyle = colors[i];
            ctx.beginPath();

            ctx.moveTo(center, center);                     //移动到到圆心
            ctx.arc(center, center, radius, startAngle, endAngle, true);
            ctx.closePath();
            ctx.fill();
            //ctx.fill();

            if(o.gap){
                ctx.strokeStyle ='#ffffff';
                ctx.lineWidth = o.gap;
                ctx.stroke();
            }
            startAngle = endAngle;
            i++
            //环状
            if(isDoughnut){
                ctx.moveTo(center, center);
                ctx.fillStyle = o.centerColor||'#ffffff';
                ctx.beginPath();
                ctx.arc(center, center, radius-o.borderWidth, 0, Math.PI * 2, true);
                ctx.fill();
            }
        }else{
            clearInterval(timer)
        }     
    },80)    
}