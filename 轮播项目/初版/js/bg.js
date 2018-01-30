
document.onmousedown=function () {
	return false;
}

const divBg=document.querySelectorAll('#bg div'),
	divBgimg=document.querySelectorAll('#bg .bg');
divBg[3].style.transform='translateZ('+0.01+'px)';//硬件加速

let imgArr=['img/0.jpg','img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg','img/10.jpg','img/11.jpg'];
let bgArr=['img/b0.jpg','img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg','img/b6.jpg','img/b7.jpg','img/b8.jpg'];
let divn=0,arrn=0;

tab(divn,arrn);
setInterval(function(){
	tab(++divn%divBgimg.length,++arrn%bgArr.length)
},11000)

function tab(divn,arrn){
	setTimeout(function(){
		divBgimg[divn].style.backgroundImage=`url(${bgArr[arrn]})`;
		divBgimg[divn].style.transform ='scale(1.2)';
		divBgimg[divn].style.opacity=1;
		setTimeout(function(){
			divBgimg[divn].style.transitionDuration='3s,16s';
			divBgimg[divn].style.opacity=0;
			setTimeout(function(){
				divBgimg[divn].style.transitionDuration='5s,16s';
				divBgimg[divn].style.transform='scale(1)';
				divBgimg[divn].style.opacity=0;	
			},5005)
		},11000)
	},5)
}
			