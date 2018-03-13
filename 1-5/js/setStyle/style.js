const section = t.$('#section')[0];
const fullTipBox = t.$('.full-tip-box')[0];
const ico = t.$('.ico',fullTipBox)[0];
const tipText = t.$('.tip-text',fullTipBox)[0];
styleV();
window.onresize = styleV;

function styleV(){
    const iH = window.innerHeight-section.offsetTop;
    section.style.height = iH + 'px';
}

function tips(title,flag) {
	tipText.innerHTML=title;
	ico.style.backgroundImage=`url(./img/full-tip-${flag?'s':'w'}.png)`;
	t.move({
        obj:fullTipBox,
        attrs:{
            top:0,
            opacity:1
        },
        d:300,
        cb:function(){
           setTimeout(function(){
                t.move({
                    obj:fullTipBox,
                    attrs:{
                        top:-40,
            			opacity:0
                    },
                    d:400
                });
           },1500);
        }
    });
}