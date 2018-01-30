
const tabox = document.querySelector('#tabox'),
	channel=tabox.querySelector('#channel'),
	channels=channel.querySelectorAll('li'),
	tabList=tabox.querySelector('#imgs'),
	prevbtn=tabox.querySelector('.prev'),
	nextbtn=tabox.querySelector('.next'),
	waiceng=document.querySelector('#waiceng'),
	close = document.getElementById('close'),
	imgs=Array.from(img);
let index,last;      // index:获取当前图片id;   last:当前特效；

prevbtn.onmousedown = nextbtn.onmousedown = function(){
	this.style.opacity = '.4';
}
prevbtn.onmouseup = nextbtn.onmouseup = function(){
	this.style.opacity = '1';
}
document.onmouseup=function () {
	prevbtn.style.opacity = '1';
	nextbtn.style.opacity = '1';
}

close.onmouseover = function(){
	this.style.transform = 'rotate(180deg)';
}
close.onmouseout = function(){
	this.style.transform = 'rotate(0deg)';
}
close.onclick = function(){
	switchList(0);
	setTimeout(function () {
		tabox.style.display = 'none';
        waiceng.style.display='block';
	},1000)
    move({
    	obj:channels[last],
        attrs:{marginLeft:-80},
        d:1500,
        fx:'elasticOut', 
    })
    move({
    	obj:channel,
        attrs:{left:-80},
        d:1500,
        fx:'elasticOut', 
    })
}


imgs.forEach((e,i)=>{
	e.ondblclick = function(){
		imgs.forEach((e,i)=>{
			e.style.width='62px';
    		e.style.height='62px';
		})
		waiceng.style.display='none';
	    tabox.style.display = 'block';
	    index=i;
	    last=0;
	    switchList(1);
	    channelClick();
	    move({
	        obj:channel,
	        attrs:{left:-40},
	        d:2000,
	        fx:'elasticOut', 
	    });
	}
})

function switchList(onOff){   //onOff:生成/关闭
	const tabH=tabList.offsetHeight,tabW=tabList.offsetWidth;
    let str = '';  
    let liNum=10;           //切割份数
	let liHight=tabH/liNum; //获取li高度
    for(var i=0;i<liNum;i++){               
        str+=`<li style='height: ${liHight}px;position: relative;overflow: hidden;'>
                  <div style='top: ${onOff?-liHight:0}px;position: absolute;'>
                       <i style="display: block;width: ${tabW}px;height: ${liHight}px;position: absolute;background: url(${imgArr[index]}) 0 ${-i*liHight}px;background-size:${tabW}px ${tabH}px;"></i>                          
                  </div> 
             </li>`;            
    }
    tabList.innerHTML = str ;  
    var oDiv = tabList.getElementsByTagName('div');
    let num;
    onOff? num=0:num=liNum-1     
    tabList.timer = setInterval(function(){
        if(num == liNum || num<0){
            clearInterval(tabList.timer);
            if(onOff) hu();
            return;
        }
        onOff?move({obj:oDiv[num++],attrs:{top:0},d:300,fx:'linear',}):move({obj:oDiv[num--],attrs:{top:-100},d:300,fx:'linear',})
    },80)
}

function channelClick(){ 
    for (let i = 0; i < channels.length; i++) {
	    channels[i].onclick = function(){
	    	let n=0;
	    	let timer=setInterval(function () {
	    		if (n++%2) tabList.style.boxShadow='none';
	    		else tabList.style.boxShadow='0 0 20px #FF8D41';
	    		if (n==6) {
	    			clearInterval(timer);
	    		}
	    	},190)
		    if(last == i)return; 
		    move({
		    	obj:channels[i],
		        attrs:{marginLeft:-10},
		        d:1500,
		        fx:'elasticOut', 
		    })
		    move({
		    	obj:channels[last],
		        attrs:{marginLeft:-80},
		        d:1500,
		        fx:'elasticOut', 
		    })
		    last = i;
		    switch(i){
		    	case 0:hu();break;
		    	case 1:sun() ;break;
		    	case 2:liang();break;
		    	case 3:liu();break;
		    }
    	}
  	}
}

function hu(){ 
	const tabH=tabList.offsetHeight,tabW=tabList.offsetWidth;
	let str='';
	let liNum=60;
	let liWidth=tabW/liNum;
	let onOff=1;
	for (var i = 0; i < liNum; i++) {
    	str += `<li style='width: ${liWidth}px;height: ${tabH}px;float:left;transition:1s;background:url(${imgArr[index]}) ${-liWidth*i}px;background-size:${tabW}px ${tabH}px;'></li>`;
    }
    tabList.innerHTML = str;
    
   
    nextbtn.onclick = function () {
    	if(!onOff) return;
	    onOff = 0;
    	index++;
    	index%=imgArr.length;
    	changeImg(1);  // 1代表下一张
    }
    prevbtn.onclick = function () {
    	if(!onOff) return;
	    onOff = 0;
    	index--;
    	if (index<0) index=imgArr.length-1;
    	changeImg(0);
    }

    function changeImg(flag){
    	let lis = tabList.getElementsByTagName('li');
    	let num;
    	let timer=null;
    	flag? num=0:num=liNum-1;
    	clearInterval(timer);
	    timer = setInterval(function(){
		    if (flag && lis[num-1]) lis[num-1].style.opacity = 1;
		    if (!flag && lis[num+1]) lis[num+1].style.opacity = 1;
		    if (num == liNum || num<0){
		        clearInterval(timer);
		        onOff = 1;
		        num = 0;
		        return;
		    }
		    if (lis[num]) {
		    	lis[num].style.opacity = 0;
	        	lis[num].style.backgroundImage = `url(${imgArr[index]})`;
		    }
		    flag? num++ : num--;
	    },50)
    }
}

function sun() {
	tabList.innerHTML='';
	const tabH=tabList.offsetHeight,tabW=tabList.offsetWidth;
	let str='';
	let row=20,col=10;
	let liWidth=tabW/row,liHight=tabH/col;
	let z1 = 999999;

	boom(row,col);
	
	let onOff1 = true;
		
	function boom(l,t) {//l 传进来几行；t传进来几列;
	  //创建一个新的li
	  let oParentNode = document.createElement("li");
	  oParentNode.style.cssText=`position:absolute;
			left: 0;
			top:0;
			background-size:1000px 600px;
			background-repeat: no-repeat;
			transform-style:preserve-3d;`;
	  //设置z-index的值
	  oParentNode.style.zIndex = z1;
	  z1--;
	  
	  tabList.appendChild(oParentNode);

	  let x = l,y = t;

	  for(var i = 0; i < y;i++){
	       for(var j = 0;j<x;j++){
	          //创建碎片用的
	          var oDiv = document.createElement("div");
	          //添加背景图片
	          oDiv.style.background = "url("+imgArr[index]+")";
	          oDiv.style.backgroundSize = `${tabW}px ${tabH}px`;
	          oDiv.style.width = tabW / x + 'px';
	          oDiv.style.height = tabH / y + 'px';
	          oDiv.style.left = (tabW / x) * j +'px';
	          oDiv.style.top = (tabH / y) * i +'px';
	          oDiv.style.backgroundPositionX = (tabW/ x)* -j + 'px';
	          oDiv.style.backgroundPositionY= (tabH/y)* -i + 'px';
	          oDiv.style.transition = (Math.random()*2)+"s";
	          oDiv.style.position='absolute';
	          oParentNode.appendChild(oDiv);
	        }
	  };

	  	let allDiv = oParentNode.children;
	    nextbtn.onclick = function () {    // 下一张
	      if(!onOff1)return;
	      onOff1 = false;
	      index++;
	      index == imgArr.length && (index = 0);   //reset 索引值

	      boom(l,t);

	      for(var i= 0;i<allDiv.length;i++){
	        allDiv[i].style.transform = 'perspective(800px) rotateX('+ (Math.random()*500-250)+'deg) rotateY('+(Math.random()*500-250)+'deg) translateX('+(Math.random()*500-250)+'px) translateY('+(Math.random()*500-250)+'px) translateZ('+(Math.random()*1000-500)+'px)'
	        allDiv[i].style.opacity = 0;
	      };
	      // 移除生成的碎片
	      setTimeout(()=>{
	        if (tabList.children == 0) {
	          tabList.children = tabList.children;
	        }else {
	          oParentNode.remove();
	          onOff1 = true;
	        }
	      },800)
	    }

	    prevbtn.onclick = function () {    //上一张
	      if(!onOff1)return;
	      onOff1 = false;
	      index--;
	      if (index < 0) {              //reset 索引值
	          index = imgArr.length - 1 ;
	        }

	      boom(l,t);

	      for(var i= 0;i<allDiv.length;i++){
	        allDiv[i].style.transform = 'perspective(800px) rotateX('+ (Math.random()*500-250)+'deg) rotateY('+(Math.random()*500-250)+'deg) translateX('+(Math.random()*500-250)+'px) translateY('+(Math.random()*500-250)+'px) translateZ('+(Math.random()*1000-500)+'px)'
	        allDiv[i].style.opacity = 0;
	      };
	      // 移除生成的碎片
	      setTimeout(()=>{
	        if (tabList.children == 0) {
	          tabList.children = tabList.children;
	        }else {
	          oParentNode.remove();
	          onOff1 = true;
	        }
	      },800)
	    }
	}
}

function liang() {
	const tabH=tabList.offsetHeight,tabW=tabList.offsetWidth;
	let str='';
	let liNum=10;
	let liH=tabH/liNum; //获取li高度

	render(index,liNum,1);
	nextbtn.onclick=function () {
		render(index++,liNum,1);  //1:切换下一张
		index%=imgArr.length;
		tab(liNum,1);             //1：向右旋转
	}
	prevbtn.onclick=function () {
		render(index--,liNum,0);
		if(index<0) index=imgArr.length-1;
		tab(liNum,0);
	}
	function render (n,liNum,flag) {
		let str='',zindex=0;
		for (var i = 0; i < liNum; i++) {
			i>liNum/2? zindex--:zindex++;
			str+=`<li style="z-index:${zindex};width: 100%;height: ${liH}px;transform-style:preserve-3d;transform: translateZ(-500px) rotateX(0deg);position: relative;">
			<a style="background:url(${imgArr[n]}) 0px -${i*liH}px;width:${tabW}px;
				height:${liH}px; 
				position:absolute;
				background-size: ${tabW}px ${tabH}px;
				transform: translateZ(500px);"></a>
			<a style="width:${tabW}px;height:${liH}px;position:absolute;background-size: ${tabW}px ${tabH}px;
				background: #333;
				transform: translateZ(500px) rotateY(90deg);
				transform-origin:left;"></a>
			<a style="background:url(${flag? imgArr[(n+1)%imgArr.length] : n? imgArr[n-1]:imgArr[imgArr.length-1]}) 0px -${i*liH}px;
				width:${tabW}px;
				height:${liH}px; 
				position:absolute;
				background-size: ${tabW}px ${tabH}px;
				transform: translateZ(-500px) rotateY(180deg);"></a>
			<a style="width:${tabW}px;height:${liH}px;position:absolute;background-size: ${tabW}px ${tabH}px;
				background: #333;
				transform: translateZ(500px) rotateY(-90deg); 
				transform-origin:right;"></a>
			<span style="width:${tabW}px;height:${tabW}px; background:#333;position:absolute;
				transform:translateZ(500px) rotateX(-90deg);
				transform-origin: top;"></span>
			<span style="width:${tabW}px;height:${tabW}px; background:#333;position:absolute;
				top:60px;
				transform:translateZ(500px) rotateX(-90deg);
				transform-origin: top;"></span>
			</li>`;
		}
		tabList.innerHTML=str;
	}

	function tab(liNum,flag) {
		Array.from(tabList.querySelectorAll('li')).forEach((e,i)=>{
			setTimeout(function () {
				e.style.marginBottom='10px';
				e.style.transform='translateZ(-1000px) rotateY(0)';
				e.style.transition=`1s ${i*60}ms cubic-bezier(0.5, -0.7, 0.4, 1.7) all`;
			},150)
			setTimeout(function () {
				e.style.marginBottom='10px';
				e.style.transform=`translateZ(-1000px) rotateY(${flag? '180':'-180'}deg)`;
				e.style.transition=`1.7s ${i*50}ms cubic-bezier(0.5, -0.7, 0.4, 1.7) all`;
			},1000+(liNum-1)*60);
			setTimeout(function () {
				e.style.marginBottom=0;
				e.style.transform=`translateZ(-500px) rotateY(${flag? '180':'-180'}deg)`;
				e.style.transition=`1s ${i*60}ms cubic-bezier(0.5, -0.7, 0.2, 1.7) all`;
			},2700+(liNum-1)*110);
		});
	}
}

function liu() {
	const tabH=tabList.offsetHeight,tabW=tabList.offsetWidth;
	let str='';
	let liNum=5;       //行数
	let liH=tabH/liNum; //获取li高度

	render(index,liH);
	nextbtn.onclick=function () {
		render(index++,liH,1);  //1:切换下一张
		index%=imgArr.length;
		tab();             //1：向右旋转
	}
	prevbtn.onclick=function () {
		render(index--,liH,0);
		if(index<0) index=imgArr.length-1;
		tab();
	}

	function render(n,liH,flag){
		let str='';
		for (var i = 0; i < 10; i++) {
			str+=`<li style="transform-style:preserve-3d;position:absolute;width:500px;height:${liH}px;top:${Math.floor(i/2)*120}px;left:${(i%2)*500}px;transform: translateZ(-5px);">
		        <a style="background:url(${imgArr[n]}) ${-(i%2)*500}px ${-Math.floor(i/2)*120}px/1000px 600px; transform: translateZ(5px);width: 100%;height: 100%;position: absolute;"></a>
		        <a style="background:url(${flag? imgArr[(n+1)%imgArr.length] : n? imgArr[n-1]:imgArr[imgArr.length-1]}) ${-(i%2)*500}px ${-Math.floor(i/2)*120}px/1000px 600px; transform: translateZ(-5px) rotateX(180deg);width: 100%;height: 100%;position: absolute;"></a>
		        <span style="background: gray; transform:translateZ(5px) rotateY(-90deg);transform-origin: right; width: 10px;height: 120px;position: absolute; right: 0;"></span>
		        <span style="background: gray;transform:translateZ(5px) rotateY(90deg);transform-origin: left; width: 10px;height: 120px;position: absolute; left: 0;"></span>
		        <span style="background: gray;transform:translateZ(5px) rotateX(90deg);transform-origin: bottom; width: 100%;height: 10px;position: absolute; bottom: 0;"></span>
		        <span style="background: gray;transform:translateZ(5px) rotateX(-90deg);transform-origin: top; width: 100%;height: 10px;position: absolute; top: 0;"></span>
		    </li>`;
		}
		tabList.innerHTML=str;
	}
	function tab() {
		Array.from(tabList.querySelectorAll('li')).forEach((e,i)=>{
			if (i%2) setTimer(e,(i+1)*50,"move2");
			else setTimer(e,(i+1)*50,"move1");
			setTimeout(function(){
	            e.querySelector('a').style.backgroundImage=`url(${imgArr[index]})`;
	        },(i*50+1500))
		})
	}
	function setTimer(obj,time,name){
        obj.timer = setTimeout(function(){
            //开启定时器之前先清除定时器
            clearTimeout(obj.timer);
            obj.style.animation = name + " 1.5s";

            obj.timer = setTimeout(function(){
                obj.style.animation = "";
                clearTimeout(obj.timer);
                obj.timer = null;
            },1500);
        },time)
    }
}