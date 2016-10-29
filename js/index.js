window.onload=function(){
  var content=$(".content");	
  var img=$(".img");
  var n=0;
  var next=0;
  var width=parseInt("1920");
  var t=setInterval(move,3000);
    function move(){
    next=n+1;
      if(next==img.length){
      	next=0;
      }
    animate(img[n],{opacity:0},1000);
	animate(img[next],{opacity:1},1000);
    n=next;
    }
 //首页轮播 
  var up=$(".up");	
  var imgs=$(".imgs");
  var ns=0;
  var nexts=0;
  var widths=parseInt("1920");
  var ts=setInterval(moves,500);
    function moves(){
    nexts=ns+1;
      if(nexts==imgs.length){
      	nexts=0;
      }
    animate(imgs[ns],{opacity:0},500);
	animate(imgs[nexts],{opacity:1},500);
    ns=nexts;
    }
  
  
  
  
  
  
}
