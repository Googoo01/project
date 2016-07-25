var C = {
    Slice: Array.prototype.slice,
    Cid: "ca-pub-3738071758743360",
    /* 获取并返回传入id的对象 */
    G: function (Id)
    {
        return typeof (Id) == "string" ? document.getElementById(Id) : Id;
    },

    /* 获取并返回传入Name的集合对象 */
    //    Gsn: function (Nm)
    //    {
    //        return document.getElementsByName(Nm);
    //    },

    /* 获取并返回传入Name的集合对象 */
    Gsn: function (Nm, Obj)
    {
        var Rst = document.getElementsByName(Nm);
        if (Obj || window.attachEvent)
        {
            Rst = [];
            var e = (C.G(Obj) || document).getElementsByTagName("*");
            for (var i = 0, len = e.length; i < len; i++)
            {
                if (e[i].tagName && e[i].getAttribute("name") == Nm)
                {
                    Rst[Rst.length] = e[i];
                }
            }
        }
        return Rst;
    },

    /* 获取并返回传入对象和传入标签子元素的数组 */
    Gs: function (prt, tg, Progeny)
    {
        var prt = typeof (prt) == "string" ? C.G(prt) : prt,
		         Childs = new Array(),
		         Ds = prt.getElementsByTagName(tg),
                 Progeny = !Progeny ? false : true;
        for (var i = 0; i < Ds.length; i++)
        {
            if (Ds[i].parentNode == prt || Progeny)
            {
                Childs.push(Ds[i]);
            }
        }
        return Childs;
    },

    /* 获取并返回具有传入样式名的元素的数组 */
    Cls: function (ClsNm, Tag, Prt)
    {
        var Tags = Tag || "*",
        Prt = C.G(Prt) || document;
        Reg = new RegExp("(^| )" + ClsNm + "( |$)"),
        t = C.Gs(Prt, Tags, true),
        Arr = [];
        for (var i = 0; i < t.length; i++)
        {
            if (Reg.test(t[i].className))
            {
                Arr.push(t[i]);
            }
        }
        return Arr;
    },

    /* 获取并返回传入元素的上一个非空元素 */
    Pre: function (Ele)
    {
        return C.Sbl(Ele, "previousSibling");
    },

    /* 获取并返回传入元素的下一个非空元素 */
    Nxt: function (Ele)
    {
        return C.Sbl(Ele, "nextSibling");
    },

    /* 获取并返回传入元素的上一个或下一个非空元素 */
    Sbl: function (Ele, Fn)
    {
        var E = Ele[Fn];
        while (E.nodeType != 1)
        {
            E = E[Fn];
        }
        return E;
    },

    /* 隐藏元素 */
    Hide: function (Id)
    {
        var oE = C.G(Id),
        H = oE.offsetHeight;
        if (H > 0)
        {
            H--;
        }
        else
        {
            return;
        }
        oE.style.height = H + "px";
        setTimeout(function () { C.Hide(Id) }, 100);
    },

    /* 显示元素 */
    Show: function (Id)
    {
        var oE = C.G(Id),
        Max = parseInt(Id.substring(2));
        oE.style.height = !oE.style.height ? "0px" : oE.style.height;
        Ch = parseInt(oE.style.height.slice(0, -2));
        if (Ch < Max)
        {
            Ch++;
            oE.style.height = Ch + "px";
            setTimeout(function () { C.Show(Id) }, 0);
        }
    },


    /* 用该方法调用函数的原型初始化方法Init，批处理该方法调用函数的实参对象 */
    Batch: function ()
    {
        //if (!C.Batch.caller.Initialized)
        // {
        var Ns = C.Slice.apply(C.Batch.caller.arguments);
        if (Ns.length > 1)
        {
            for (var i = 0; i < Ns.length; i++)
            {
                C.Batch.caller.prototype.Init(C.G(Ns[i]));
            }
        }
        else
        {
            C.Batch.caller.prototype.Init(C.G(Ns[0]))
        }
        //C.Batch.caller.Initialized = true;
        //}
    },

    /* 获取传入元素的当前样式对象 */
    CurrentStyle: function (element)
    {
        return element.currentStyle || document.defaultView.getComputedStyle(element, null);
    },

    AttrStyle: function (Elem, Attr)
    {
        if (Elem.Attr)
        {
            return Elem.style[Attr];
        } else if (Elem.currentStyle)
        {
            return Elem.currentStyle[Attr];
        } else if (document.defaultView && document.defaultView.getComputedStyle)
        {
            Attr = Attr.replace(/([A-Z])/g, '-$1').toLowerCase();
            return document.defaultView.getComputedStyle(Elem, null).getPropertyValue(Attr);
        } else
        {
            return null;
        }
    },

    /* 获取传入元素,设置其子元素等高 */
    Eh: function (Id, Tg)
    {
        var Ctn = C.G(Id),
        Sbs = C.Gs(Ctn, Tg),
        Hs = [];
        for (var i = 0; i < Sbs.length; i++)
        {
            Hs[i] = Sbs[i].clientHeight;
        }
        for (var j = 0; j < Sbs.length; j++)
        {
            Sbs[j].style.height = Hs.sort(function (a, b) { return b - a; })[0] + "px";
        }
    },

    /* 设置传入元素等高 */
    Ehs: function ()
    {
        var Es = [],
        Hs = [];
        for (var i = 0; i < arguments.length; i++)
        {
            var El = C.G(arguments[i]);
            if (El.nodeType == 1)
            {
                Es.push(El);
                Hs.push(El.clientHeight);
            }
        }
        for (var j = 0; j < Es.length; j++)
        {
            Es[j].style.height = Hs.sort(function (a, b) { return b - a; })[0] + "px";
        }
    },

    /* 将传入iFrame的高度设为载入文档的实际高度 */
    Fi: function (Id)
    {
        var F = C.G(Id),
        Vh = C.Gs(F.contentWindow.document.documentElement, "body")[0].clientHeight;
        F.style.height = Vh + "px";
    },

    /* 获取并返回时间 */
    Ts: function ()
    {
        return "timestamp=" + new Date().getTime().toString();
    },

    /* 为对象添加的事件监听  */
    AddEvent: function (obj, ev, fn, arg)
    {
        var Ehd = !arg ? fn : function (e) { fn(e, arg); };
        if (window.addEventListener)
        {
            obj.addEventListener(ev, Ehd, false);
        }
        else if (window.attachEvent)
        {
            obj.attachEvent("on" + ev, Ehd);
        }
        else
        {
            obj["on" + ev] = Ehd;
        }
    },

    /* 为对象添加的事件监听  */
    AE: function (obj, ev, fn, arg)
    {
        var Ehd;
        if (arguments.length < 4)
        {
            Ehd = fn;
        }
        else
        {
            var Ag = C.Slice.call(arguments, 3);
            Ehd = function () { return function (e) { Ag.unshift(e); fn.apply(null, Ag); }; } ();
        }
        //var Ehd = !arg ? fn : function (e) { fn.call(null, C.Slice.call(arguments, 3).join()) };
        //var Ehd = !arg ? fn : function (e) { fn(e, arg); };
        if (window.addEventListener)
        {
            obj.addEventListener(ev, Ehd, false);
        }
        else if (window.attachEvent)
        {
            obj.attachEvent("on" + ev, Ehd);
        }
        else
        {
            obj["on" + ev] = Ehd;
        }
    },


    /* 删除对象的事件监听 */
    DelEvent: function (obj, ev, fn)
    {
        if (window.removeEventListener)
        {
            obj.removeEventListener(ev, fn, false);
        }
        else if (window.detachEvent)
        {
            obj.detachEvent("on" + ev, fn);
        }
        else
        {
            obj["on" + ev] = null;
        }
    },

    /* 阻止事件冒泡 */
    StopBubble: function (e)
    {
        if (e && e.stopPropagation)
        {
            e.stopPropagation();
        }
        else
        {
            window.event.cancelBubble = true;
        }
    },

    /* 删除传入元素的class属性  */
    DelClass: function (M, Cn)
    {
        //M.className = M.className.replace(new RegExp("( ?|^)" + Cn + "\\b"), "");
        if (M)
        {
            var Cls = M.getAttribute("class") || M.getAttribute("className");
            if (Cls && Cls.indexOf(Cn) > -1)
            {
                M.className = Cls.replace(new RegExp("( ?|^)" + Cn + "\\b"), "");
            }
        }
    },

    /* 添加传入元素的class属性  */
    AddClass: function (M, Cn)
    {
        if (M)
        {
            var Cls = M.getAttribute("class") || M.getAttribute("className");
            if (Cls != null)
            {
                Cn = Cls.indexOf(Cn) == -1 ? Cls + " " + Cn : Cls;
            }
            M.className = Cn;
        }
    },

    /* 获取元素属性  */
    Attr: function (Id, Attr)
    {
        var obj = C.G(Id), oAttr;
        if (obj.getAttribute(Attr))
        {
            oAttr = obj.getAttribute(Attr)
        }
        else if (obj.attributes[Attr])
        {
            oAttr = obj.attributes[Attr];
        }
        return oAttr;
    },

    /* 删除元素属性  */
    DelAttr: function (Id, Attr)
    {
        var obj = C.G(Id), oAttr;
        if (obj.getAttribute(Attr))
        {
            obj.removeAttribute(Attr);
        }
        else if (obj.attributes[Attr])
        {
            obj.removeAttributeNode(obj.attributes[Attr]);
        }
    },
    /* 删除传入元素的style属性  */
    DelStyle: function (Ele)
    {
        if (Ele.getAttribute("style"))
        {
            Ele.removeAttribute("style");
        }
        else if (Ele.attributes["style"])
        {
            Ele.removeAttributeNode(Ele.attributes["style"]);
        }
    },
    /* 全选和取消全选  */
    Sa: function (Sp, Intro)
    {
        var Sp = C.G(Sp),
        Cs = C.Gs(Sp, "input", true),
        Itr = null;
        if (Intro)
        {
            Itr = C.G(Intro); /* Itr如果是否包含在Cs中，则删除  */
        }
        else
        {
            switch (Sp.id.charAt(0).toUpperCase())
            {
                case "F":
                    Itr = Cs.shift();
                    break;
                case "L":
                    Itr = Cs.pop();
                    break;
            }
        }
        C.AddEvent(Itr, "click", function ()
        {
            for (var i = 0; i < Cs.length; i++)
            {
                if (Cs[i].type == "checkbox")
                {
                    Cs[i].checked = Itr.checked ? true : false;
                }
            }
        });
    },

    /* 创建并返回一个XMLHttpRequest对象  */
    XHR: function ()
    {
        var XHR;
        try
        {
            XHR = new XMLHttpRequest();
        }
        catch (e1)
        {
            try
            {
                XHR = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e2)
            {
                try
                {
                    XHR = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e3)
                {
                    XHR = false;
                }
            }
        }
        return XHR;
    },

    /* 执行异步请求 */
    EXHR: function (CallBack, Method, Url, Data, Proc, Async)
    {
        var oXHR = this.XHR(),
            Rst = null,
            Junctor = Url.indexOf("?") != -1 ? "&" : "?";
        oXHR.onreadystatechange = function ()
        {
            switch (oXHR.readyState)
            {
                case 0:
                    Rst = "请求未初始化";
                    break;
                case 1:
                    Rst = "服务器连接已建立";
                    break;
                case 2:
                    Rst = "请求已接收";
                    break;
                case 3:
                    Rst = "请求处理中";
                    break;
                case 4:
                    Rst = "请求已完成，且响应已就绪";
                    if (oXHR.status == 200)
                    {
                        var Rsp = null,
                                 cType = oXHR.getResponseHeader("Content-Type");
                        if (cType.indexOf("text/xml") != -1) { Rsp = oXHR.responseXML }
                        else if (cType.indexOf("text/json") != -1 ||
			cType.indexOf("text/html") != -1 ||
                            cType.indexOf("text/javascript") != -1 ||
                            cType.indexOf("application/javascript") != -1 ||
                            cType.indexOf("application/json") != -1 ||
                            cType.indexOf("application/x-javascript") != -1)
                        {
                            Rsp = eval('(' + oXHR.responseText + ')');
                            //Rsp = JSON.parse(oXHR.responseText);
                        }
                        else
                        {
                            Rsp = oXHR.responseText;
                        }
                        CallBack(Rsp);
                    }
                    break;
            }
            if (Proc) { Proc(Rst); }
        };
        Data = Method == "GET" ? null : Data;
        //Url += Junctor + "timeStamp=" + new Date().getTime();
        Async = Async != false ? true : false;
        oXHR.open(Method, encodeURI(Url), Async);
        if (Method == "POST")
        {
            oXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //oXHR.setRequestHeader("Content-type", "multipart/form-data");
        }
        oXHR.send(Data);
    },

    /* 加入收藏 */
    Collect: function (sUrl, Tit)
    {
        var sUrl = !sUrl ? document.URL : sUrl,
         Tit = !Tit ? document.title : Tit;
        if (window.external && window.external.addFavorite)
        {
            window.external.addFavorite(sUrl, Tit);
        }
        else if (window.sidebar && window.sidebar.addPanel)
        {
            window.sidebar.addPanel(Tit, sUrl, "");
        }
        else
        {
            alert("对不起，您所使用的浏览器不允许点击收藏!\n请使用Ctrl+D进行收藏。");
        }
    },

    /* 设为首页 */
    SetHome: function (sUrl)
    {
        var sUrl = !sUrl ? document.URL : sUrl;
        try
        {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(sUrl);
        }
        catch (e)
        {
            alert("抱歉!您的浏览器不支持直接设为首页。您可通过浏览器 工具->选项->使用当前页->确定，完成设为首页。");
        }
    },

    /* 获取客户机日期并返回字符串
    传入ID的第一个字符代表不同时区： A:当前时区(北京) +8    B:伦敦 0    C:纽约 -9    D:东京 +9    E:芝加哥 -6
    传入ID的第二个字符代表不同的精确模式：D 精确到日期  W 星期 M为精确到分钟 S为精确到秒的时间
    */
    sDate: function ()
    {
        this.Ts = arguments.length == 0 ? this.Ts : C.Slice.apply(arguments);
        var D = new Date,
        Wd = ["日", "一", "二", "三", "四", "五", "六"],
        Y = D.getUTCFullYear(),
        M = (D.getUTCMonth() + 1),
        Ds = D.getUTCDate(),
        H = D.getUTCHours(),
        Mt = D.getUTCMinutes(),
        S = D.getUTCSeconds(),
        W = Wd[D.getDay()];
        for (var i = 0; i < this.Ts.length; i++)
        {
            var Pl = C.G(this.Ts[i]),
            Str = "",
            Jetlag = -D.getTimezoneOffset(),
            J;
            switch (this.Ts[i].charAt(0).toUpperCase())
            {
                case "A":
                    J = 8;
                    break;
                case "B":
                    J = 1;
                    break;
                case "C":
                    J = -4;
                    break;
                case "D":
                    J = 9;
                    break;
                case "E":
                    J = -5;
                    break;
            }
            H = D.getUTCHours() + J;
            if (H >= 24)
            {
                Ds += 1;
                H = H - 24;
            }
            else if (H < 0)
            {
                Ds -= 1;
                H += 24;
            }
            S = S.toString().length != 2 ? S = "0" + S : S;
            Mt = Mt.toString().length != 2 ? Mt = "0" + Mt : Mt;
            switch (this.Ts[i].charAt(1).toUpperCase())
            {
                case "D":
                    Str = Y + "年" + M + "月" + Ds + "日";
                    break;
                case "W":
                    Str = Y + "年" + M + "月" + Ds + "日" + " 星期" + W;
                    break;
                case "M":
                    Str = H + ":" + Mt;
                    break;
                case "S":
                    Str = H + ":" + Mt + ":" + S;
                    break;
            }
            Pl.innerHTML = Str;
        }
        setTimeout(function () { C.sDate() }, 1000);
    },

    /* 初始化Google广告环境 */
    /* GInt: function ()
    {
    GS_googleAddAdSenseService(C.Cid);
    GS_googleEnableAllServices();
    },

    显示Google广告 
    Gdo: function ()
    {
    GA_googleUseIframeRendering();
    for (var i = 0; i < arguments.length; i++)
    {
    var Ga = C.G(arguments[i]),
    Aid = Ga.id,
    W = parseInt(Ga.style.width.slice(0, -2)),
    H = parseInt(Ga.style.height.slice(0, -2));
    GA_googleFillSlotWithSize(C.Cid, Aid, W, H);
    }
    var Gaw = C.G("Gas");
    window.setTimeout(function ()
    {
    var Gas = C.Gs(Gaw, "div");
    for (var j = 0; j < Gas.length; j++)
    {
    C.G(Gas[j].id.substring(15)).innerHTML = Gas[j].innerHTML;
    }
    Gaw.parentNode.removeChild(Gaw);
    }, 500);
    },*/
    /* 显示百度广告 */
    Bdo: function ()
    {
        var Baw = C.G("Bas"),
        Args = arguments;
        for (var i = 0; i < Args.length; i++)
        {
            BAIDU_CLB_fillSlot(arguments[i]);
        }
        Baw.id += Math.random().toString().replace(".", "");
        window.setTimeout(function ()
        {
            var Bad = C.Gs(Baw, "div");
            for (var j = 0; j < Args.length; j++)
            {
                var Win = C.G("baidu_clb_slot_iframe_" + Args[j]);
                if (Win != null)
                {
                    var Ad = Win.contentWindow.document.getElementsByTagName("a")[0] || Win.contentWindow.document.getElementsByTagName("object")[0] || Win.contentWindow.document.getElementsByTagName("embed")[0];
                    if (!Ad) { continue; }
                    C.G(Bad[j].id.substring(15)).innerHTML = Ad.parentNode.innerHTML;
                }
            }
            //Baw.parentNode.removeChild(Baw);
        }, 2000);
    }
};
Function.prototype.Method = function (Nm, Fun)
{
    if (!this.prototype[Nm])
    {
        this.prototype[Nm] = Fun;
    }
};
String.Method("Trim", function () { return this.replace(/^\s+|\s+$/g, ""); });
//Element.Method("getElementsByName", function ()
//{
//    ;
//});