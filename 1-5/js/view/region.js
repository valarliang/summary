document.onmousemove=function (ev) {
    return false;
}
folders.onmousedown=function (ev) {
    if (ev.target!=this) return;
    let disX=ev.pageX,
        disY=ev.pageY;
    const kuang=document.createElement('div');
    this.appendChild(kuang);

    this.onmousemove=function (ev) {
        kuang.className='kuang';
        kuang.style.width=Math.abs(ev.pageX-disX)+'px';
        kuang.style.height=Math.abs(ev.pageY-disY)+'px';
        let l=Math.min(disX,ev.pageX),
            top=Math.min(disY-kuang.offsetParent.offsetTop,ev.pageY-kuang.offsetParent.offsetTop);
        kuang.style.left=l+'px';
        kuang.style.top=top+'px';

        let files = Array.from(t.$('.file-item')),
            ii = t.$('.file-item i');
        files.forEach((e,i)=>{
            e.classList.remove('hov');
            ii[i].className='';
            checkall.className='checkAll';
            if (t.touch(e,kuang)) {
                e.classList.add('hov');
                ii[i].className='checked';
                checkall.className = files.every(e=>e.classList.contains('hov'))?'checked':'checkedAll';
            }
        })

    }
    document.onmouseup=document.onmouseleave=function () {
        folders.onmousemove=folders.onmouseup=null;
        kuang.remove();
    }
}