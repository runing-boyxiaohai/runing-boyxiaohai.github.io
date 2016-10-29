// 适配IE低版本的className
function getClass(classname,range){
	range=range||document;
	if(range.getElementsByClassName)
	{
		return range.getElementsByClassName(classname);
	}
	else
	{
		var all=range.getElementsByTagName("*");
        var arr=[];
		for(var i=0;i<all.length;i++)
		{
			if(checkClass(all[i].className,classname))
			{
				arr.push(all[i]);
				
			}

		}
		return arr;

	}
}
function checkClass(obj,classname){
	
	var newarr=obj.split(" ");
	for (var i=0;i<newarr.length;i++) {
		if(newarr[i]==classname)
		{
			return true;
		}
	}
	return false;
}


/*getContent(obj,value)
  获取或设置obj的文本内容

*/
function getContent(obj,value){
	if(value==undefined)
	{
	  if(obj.innerText)
	  {
		 return obj.innerText;
	  }
	  else
	  {
		 return obj.textContert;
	  }
	}
	else
	{
		if(obj.innerText)
	    {
		   obj.innerText=value;
	    }
	    else
	    {
		  obj.textContert=value;
	    }
	}
}

/*getStyle(obj,style)
  获取对象的属性
*/
function getStyle(obj,style)
{
	if(obj.currentStyle)
	{
		// return obj.currentStyle."width"
		return obj.currentStyle[style];
	}
	else
	{
		return getComputedStyle(obj,null)[style];
	}
}

function $(selecter,range){                                 
   range=range||document;
   // selecter=selecter.trim();
  if(typeof(selecter)=="string")
  {  
   if(selecter.charAt(0)==".")
   {
    return getClass(selecter.substring(1),range);
   }
   else if(selecter.charAt(0)=="#")
   {
    return range.getElementById(selecter.substring(1));
   }
   else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selecter))
   {
    return range.getElementsByTagName(selecter);
   }
   else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(selecter))
   {
    return document.createElement(selecter.slice(1,-1));
   }

  }
  else if(typeof(selecter)=="function")   //function的typeof是"function"
  {
         window.onload=function(){     
          selecter();
         }
  }
   
}



/*getChilds(obj,type)
  得到元素节点||元素节点和有意义的文本
  最终得到满足条件的集合
 */
 function getChilds(obj,type){
 	type=type===undefined?"no":type;
 	var kids=obj.childNodes;
 	var arr=[];
    for(var i=0;i<kids.length;i++)
    {
        if(type=="no")
	 	{
           if(kids[i].nodeType==1)
           {
              arr.push(kids[i]);
           }
	 	}
	 	else if(type=="yes")
	 	{
          if(kids[i].nodeType==1||kids[i].nodeType==3&&kids[i].nodeValue.replace(/^\s*|\s*$/g,""))
	 	  {
	 	  	 arr.push(kids[i]);
	 	  }
	 	}
	
    }
    return arr;
 	
}

/*
 getFirst(obj,type)
 得到第一个孩子

*/
function getFirst(obj,type){
   type=type===undefined?"no":type;
   return getChilds(obj,type)[0];
}

function getLast(obj,type){
	type=type===undefined?"no":type;
	
    return getChilds(obj,type)[getChilds(obj,type).length-1];
}

/*
  getN(obj,num,type)
  获得任意一个孩子

*/

function  getN(obj,num,type){
	type=type===undefined?"no":type;
	var childs=getChilds(obj,type);
	if(num>childs.length||num<1)
	{
		return false;
	}
	return childs[num-1];
}

/*
  getNext(obj,type)
  获取下一个兄弟节点

*/
function getNext(obj,type){
	type=type===undefined?"no":type;
	var next=obj.nextSibling;
	if(next==null)
	{
		return false;
	}
    if(type=="no"){
    	while(next.nodeType==3||next.nodeType==8)
    	{
    		next=next.nextSibling;
    		if(next==null)
    		{
    			return false;
    		}
    	}
    	return next;

    }
    else if(type=="yes")
    { 
    	while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8)
    	{
    		next=next.nextSibling;
    		if(next==null)
    		{
    			return false;
    		}
    	}
    	return next;


    }
}


/*
  getPrevious(obj,type)
  获得前一个孩子

*/
function getPrevious(obj,type){
	type=type===undefined?"no":type;
	var next=obj.previousSibling;
	if(next==null)
	{
		return false;
	}
    if(type=="no"){
    	while(next.nodeType==3||next.nodeType==8)
    	{
    		next=next.previousSibling;
    		if(next==null)
    		{
    			return false;
    		}
    	}
    	return next;

    }
    else if(type=="yes")
    { 
    	while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8)
    	{
    		next=next.previousSibling;
    		if(next==null)
    		{
    			return false;
    		}
    	}
    	return next;


    }
}



/*insertBefore(obj,beforeObj)     认识文本
  在某个对象前插入一个对象
*/
function insertBefore(obj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(obj,beforeObj);
} 

/*insertAfter(obj,afertObj,type)
  在某个对象后面插入一个对象
*/
function insertAfter(obj,afertObj,type){
	var parent=afertObj.parentNode;
	type=type===undefined?"no":type;
	var next=getNext(afertObj,type);
	if(!next)                               //有没有下一个兄弟元素
	{
		parent.appendChild(obj);
	}
	else
	{
       parent.insertBefore(obj,next);
	}
	

}


/*
  addEvent(obj,event,fun)
  添加事件处理程序
  obj：对象
  event：事件
  fun：事件处理程序

*/
function addEvent(obj,event,fun){
	
	if(obj.attachEvent)
	{
         return obj.attachEvent("on"+event,fun) 
	}
	else if(obj.addEventListener)
	{
		 return obj.addEventListener(event,fun,false) 
	}
}

/*
  removeEvent(obj,event,fun)
  添加事件处理程序
  obj：对象
  event：事件
  fun：事件处理程序

*/
function removeEvent(obj,event,fun){
	
	if(obj.detachEvent)
	{
         return obj.detachEvent("on"+event,fun) 
	}
	else if(obj.removeEventListener)
	{
		 return obj.removeEventListener(event,fun,false) 
	}
}


/*
 mouseWheel(obj,down,up)
 鼠标滚轮事件
 down、up都是都是匿名函数
 
 mouseWheel(document,function(){
	alert("下");
 },function(){
	alert("上");
 })

*/

function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scroolFun)
	}
	else{
		obj.addEventListener("mousewheel",scroolFun,false);
		obj.addEventListener("DOMMouseScroll",scroolFun,false);
	}

	function scroolFun(e){
		var e=e||window.event;
		if(e.preventDefault){           //清除浏览器默认动作
			e.preventDefault();
		}
		else{
			e.returnValue=false;
		}
		var num=e.wheelDelta||e.detail;
		if(num==120||num==-3)
		{
			//改变this指针，让this指向obj
			up.call(obj);        
		}
		else if(num==-120||num==3)
		{
			down.call(obj);
		}


	}


	//图片效果
 var w0w=$(".w0w");
    for(var i=0;i<=w0w.length;i++){
         ytborder(w0w[i])
        }
    function ytborder(w0w){
    var width=parseInt(getStyle(w0w,"width"))+2;
    var height=parseInt(getStyle(w0w,"height"))+2;

         var wrr=[];
    for(var i=0;i<4;i++){
      var w1w=$("<div>");
        w1w.style.cssText="position:absolute;background:#000;"
           w0w.appendChild(w1w);
       wrr.push(w1w)
       }
           wrr[0].style.cssText+="width:0px;height:1px;left:-1px;top:-1px;"
       wrr[1].style.cssText+="width:1px;height:0px;left:-1px;top:-1px;"
       wrr[2].style.cssText+="width:0px;height:1px;right:-1px;bottom:-1px;"
       wrr[3].style.cssText+="width:1px;height:0px;right:-1px;bottom:-1px;"
       w0w.onmouseover=function(){
        animate(wrr[0],{width:width},600);
        animate(wrr[1],{height:height},600);
              animate(wrr[2],{width:width},600);
        animate(wrr[3],{height:height},600);
        }

                w0w.onmouseout=function(){
        animate(wrr[0],{width:0},600);
        animate(wrr[1],{height:0},600);
              animate(wrr[2],{width:0},600);
        animate(wrr[3],{height:0},600);}

    
    
    }

}

//设置cookies
function setCookie(attr,value,time){
   if(time==undefined){
   	document.cookie=attr+"="+value;
   }else{
     var now=new Date();
     now.setTime(time.getTime()+time*1000);
     document.cookie=attr+"="+value+";expires="+now.toGMTString();
   }
}

//获取cookie
function getCookie(val){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i=0;i<arr.length;i++){
       var arrValue=arr[i].split("=");
       if(val==arrValue[0]){
       	return arrValue[1];
       }
	}
	return false;
}
// //删除cookie
// function delCookie(attr){
//    var  now=new.Date();
//    now.setTime(now.getTime()-1);
//    document.cookie=attr+"=aklsad;expires="+now.toGMTString();
// }