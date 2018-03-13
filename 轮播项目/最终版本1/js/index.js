//盒子变换效果
function hasClassName(inElement, inClassName){
    let classStr = inElement.className;
    let classArr = classStr.split(' ');
    for(var i=0;i < classArr.length ; i++){
        if(inClassName == classArr[i]){
            return true;
        }
    }
    return false;
}

function addClassName(inElement, inClassName){
    if(!hasClassName(inElement, inClassName)){
      inElement.className = [inElement.className, inClassName].join(' ');
    }
}

function removeClassName(inElement, inClassName){
    if(hasClassName(inElement, inClassName)){
        let j = 0;
        let newClassArr =[];
        let classArr = inElement.className.split(' ');
        for(var i = 0;i<classArr.length;i++){
            if(classArr[i]==inClassName) {
                continue;
            }
            newClassArr[j] = classArr[i];
            j++
        }
        inElement.className = newClassArr.join(' ');
    }
}

function toggleClassName(inElement, inClassName){
    if(hasClassName(inElement, inClassName)){
        removeClassName(inElement, inClassName);
    }else{
        addClassName(inElement, inClassName);
    }
}

function toggleShape(){
    let shape = document.getElementById('shape');
    if(hasClassName(shape, 'ring')){
        removeClassName(shape, 'ring');
        addClassName(shape, 'cube');
    }else{
        removeClassName(shape, 'cube');
        addClassName(shape, 'ring');
    }

    //转换样式translateZ（）导致的感觉太近
    let stage = document.getElementById('stage');
    if(hasClassName(shape, 'ring')){
        stage.style.webkitTransform = 'translateZ(-200px)';
    }else{
        stage.style.webkitTransform = '';
    }
}

//音乐背景
function Html5Audio(url,loop){
	var audio = new Audio(url);
	audio.loop = loop;
	audio.autoplay = true;
	audio.play();
}
Html5Audio('imagse/Fade.mp3',true);
        

//底部
//首先用这个高逼格的获取元素，就是先声明一个对象
const t = {
    $:function fn1(s){
        if(s,parent=document){
            return parent.querySelectorAll(s);
        }
    }
}


//获取元素

const box = t.$('#box')[0];
const img = box.getElementsByTagName('img');

//开头动画
Array.from(img).forEach((e,i,all)=>{
    setTimeout(function () {
        move({obj:e,attrs:{top:0},d:3000,fx:'elasticOut'});
    },i*100+500);
    setTimeout(function () {
        under();
    },(all.length-1)*100+1300);
});
setTimeout(function () {
    toggleShape();
},200)


function under(){
    //声明一个开关，两个定时器
    var onOFF = true;
    var timer = null;
    var timer6 = null;
    //当鼠标移动的时候触发这个事件
    box.onmousemove = function(ev){
        //获取event详细信息
        var ev = event || window.event;
        //循环图片
        for(let i=0;i<img.length;i++){
            //利用三角函数-得出的是图片中心点的位置，X轴和Y轴
            var X = img[i].offsetLeft + img[i].offsetWidth/2 + box.offsetLeft;
            var Y = img[i].offsetTop + img[i].offsetHeight/2 + box.offsetTop;
            // console.log(Y)
           
            //b得出两个值：鼠标移动的点-中心点位置就是X轴
            //a得出两个值：鼠标移动的点-中心点位置就是Y轴
            var b = ev.clientX - X;
            var a = ev.clientY - Y;
            //c得出三角函数的斜边：把a和b平方相加后在开方
            var c = Math.sqrt(Math.pow(b,2) + Math.pow(a,2));
            //c得出的值太大就除以300这样值就变小了，但是鼠标离谁近谁的值小，
            //需要用1-这个值然后就变小了。
            var scale = 1 - c/500
            
            //因为鼠标移走的时候图片会变为一个圆点，那么就需要控制下，
            //当图片小于自身的0.6的时候那么就让图片等于这个0.6
            if(scale < 0.5){
                scale = 0.5;
            }
            //改变图片的宽高，就用得出的值*图片大小
            img[i].style.width = scale * 120 + 'px';
            img[i].style.height = scale * 120 + 'px';
            img[i].style.transition = .1 + 's';
        }
        //循环图片
        for(let i=0;i<img.length;i++){
            
            //当我的点击图片的时候
            img[i].onclick = function(ev){
                this.onmouseout=function (ev) {
                    ev.cancelBubble=true;
                }
                
                //如果目前的状态不是true，是false的时候就return出去下边的不执行
                if(!onOFF)return
                //把开关关上
                onOFF = false;
                //图片旋转360度-一圈
                this.style.transform = 'rotate(360deg)';
                this.style.transform = 'rotate(360deg)';
                this.style.transition = .3 + 's';
                //把timer6的定时器关掉
                clearInterval(timer6)
                //开一个定时器
                timer =setInterval(() => {
                    //让图片角度延迟500毫秒停留在360度这个位置
                    img[i].style.transform = 'rotate(360deg)';
                    img[i].style.transform = 'rotate(360deg)';
                    //执行完了就关掉，执行一次关一次，在里边关
                    clearInterval(timer)
                    // console.log(timer)
                    
                    //开一个定时器，只炸一次的，只执行一次
                    timer6 =setTimeout(() => {
                        //让他延迟10毫秒后执行把图片回归0度，原点位置
                        img[i].style.transform = 'rotate(0deg)';
                        img[i].style.transform = 'rotate(0deg)';
                        this.style.transition = -1 + 's';
                        // console.log(timer6)
                        toggleShape();
                        onOFF = true;
                        //抖函数，调用第一个参数是obj，第二个参数是atr
                        //第三个值是n，第三个参数是回调函数
                        // shake(img[i],'top',20,function(){
                        //     //抖完了确保图片位置补乱把他的top值回归0，
                        //     //在把开关打开
                        //     img[i].style.top = 0;
                        //     //boxes();
                        //     toggleShape();
                        //     onOFF = true; 
                        // })
                        // console.log(img[i])
                    },10);
                },500); 
            }
        }
        //为了阻止默认行为
        document.onmousedown = function(){
            return false;
        }
        box.onmouseout=function () {
            for (var i = 0; i < img.length; i++) {
                img[i].style.width='62px';
                img[i].style.height='62px';
            }
        }
    }  
}

