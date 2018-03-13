// boxes();
function boxes(){
  const case1 = document.querySelectorAll('#shape')[0];
  const case1Img = Array.from(shape.querySelectorAll('img'));
  const case1Img0 = shape.querySelectorAll('img')[0];
  const box1 = document.querySelectorAll('#box')[0];
  const box1Img = Array.from(box.querySelectorAll('img'));
  const styleY = document.getElementsByTagName('style')[0];
  const one = document.querySelectorAll('.one')[0];
  let timer = null;
  let timer2 = null;
  let onOFF = true;
  
  for(let i = 0;i < case1Img.length;i++){
    (function(case1Img,box1Img){
      case1Img.onclick = function(){
        toggleShape();
      }
      //鼠标移入动画停止转动
      // case1Img.onmouseover = function(){
      //   styleY.innerText = '@keyframes spin {\
      //       from { transform: rotateY(0deg); }\
      //       to   { transform: rotateY(0deg); }\
      //    }';
         
      // }
      //鼠标移出动画开始转动
      // case1Img.onmouseout = function(){
      //   styleY.innerText = '@keyframes spin {\
      //       from { transform: rotateY(0deg); }\
      //       to   { transform: rotateY(-360deg); }\
      //    }';
      // }
      
      box1Img.onmouseover = function(ev){
        let box1ImgLeft = ev.pageX - box1Img.offsetWidth; 
        styleY.innerText = '@keyframes spin {\
            from { transform: rotateY(0deg); }\
            to   { transform: rotateY('+ (-box1ImgLeft) +'deg); }\
         }';
      }
      
      //点击底部图片执行代码
      // box1Img.onclick = function(){        
      //   if(!onOFF)return;
      //   onOFF = false;
      //   //切换样式
      //   toggleShape();
      //   //停止转动
      //   styleY.innerText = '@keyframes spin {\
      //       from { transform: rotateY(0deg); }\
      //       to   { transform: rotateY(0deg); }\
      //    }';
        
      //   clearTimeout(timer);
      //   clearTimeout(timer2);
      //   timer = setTimeout(function(){
      //     //底部点击哪个图片 转动图片中间换那张图片
      //     case1Img0.setAttribute('src', case1Img.getAttribute('src'));
          
      //     //一秒之后在开始转动
      //     timer2 = setTimeout(function(){
      //       styleY.innerText = '@keyframes spin {\
      //         from { transform: rotateY(0deg); }\
      //         to   { transform: rotateY(-360deg); }\
      //       }';
      //      onOFF = true;
      //     },1000);
          
      //   },1000);
      // }
    })(case1Img[i],box1Img[i])
  }
}