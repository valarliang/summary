const remove = t.$('#remove')[0];
const rename = t.$('#rename')[0];
const del = t.$('#del')[0];
const create = t.$('#create')[0];
const tanbox = t.$('#tanbox')[0];
const modalTree = t.$('#move-to')[0];
const content = t.$('.content',modalTree)[0];

del.onclick=function () {
    const files=Array.from(folders.children),
        pid=data[files[0].dataset.index].pid;
    if (!files.some(e=>e.classList.contains('hov'))) tips('请选择您要删除的文件 : )',0);
    else{
        tanbox.style.display='block';
        const confirm=t.$('.conf-btn a',tanbox)[0],
            cancel=t.$('.conf-btn a',tanbox)[1],
            close=t.$('.close-ico',tanbox)[0];
        confirm.onclick=function () {
            files.filter(e=>e.classList.contains('hov')).forEach(e=>{
                t.delete(e.dataset.index);
                e.remove();
            })
            getTree(-1);
            render(pid);
            tanbox.style.display='none';
            tips('删除文件成功',1);
        }
        cancel.onclick=close.onclick=function () {
            tanbox.style.display='none';
        }
    }
}

rename.onclick=function () {
    const files=Array.from(folders.children);
    if (!files.some(e=>e.classList.contains('hov'))) tips('请选择您要重命名的文件 : )',0);
    else if (files.filter(e=>e.classList.contains('hov')).length>1) tips('请选择一个您要重命名的文件 : )',0);
    else{
        const el=files.find(e=>e.classList.contains('hov'));
        const name=t.$('.folder-name',el)[0],
            editor=t.$('.editor',el)[0];
        editor.value=name.innerText;
        editor.style.display='block';
        editor.focus();
        name.style.display='none';
        editor.onkeydown=function (ev) {
            if (ev.keyCode==13) finish();
        }
        editor.onblur=finish;

        function finish () {
            if (t.nameExit(el.dataset.index,editor.value)) tips('已存在相同命名的文件，请重新命名 : )',0),editor.focus();
            else{
                el.classList.remove('hov');
                el.children[3].classList.remove('checked');
                if (!editor.value) editor.value=name.innerText;
                else {
                    data[el.dataset.index].title=name.innerText=editor.value;
                    editor.style.display='none';
                    name.style.display='block';
                }
                getTree(-1);
            }
        }
    }
}

create.onclick=function () {
    let pid=t.$('span',breadNav)[0].dataset.index * 1,
        id=t.create(pid);
    if(t.nameExit(id,'新建文件夹')){
        tips('请修改"新建文件夹"这个名字!',0);
        delete data[id];
    }else{
        render(pid);
        getTree(-1);
    }
}

remove.onclick=function () {
    const files = Array.from(folders.children);
    if(!files.some(e=>e.classList.contains('hov'))) tips('请选择要移动的文件夹',0);
    else{
        let els = files.filter(e=>e.classList.contains('hov')).map(e=>e.dataset.index*1);
        modalTree.style.display = 'block';
        content.innerHTML = renderTree(0,-1);

        content.onclick = function(ev){
            if(ev.target.tagName === 'SPAN'){
                let targetId=ev.target.dataset.index * 1;
                let trees = Array.from(t.$('.tree-title',content));
                trees.forEach(e=>e.style.background = '');
                ev.target.parentNode.style.background = '#ccc';

                t.$('.ok')[0].onclick = function(){
                    if (els.some(e=>t.getParents(targetId).map(e=>e.id*1).includes(e))) alert('无法将目标文件夹移入自身子文件夹，请重新选择文件夹 ：）');
                    else{
                        els.forEach(e=>t.changePid(e,targetId));
                        modalTree.style.display = 'none';
                        render(targetId);
                        renderNav(targetId);
                        getTree(-1);
                    }
                }
            }
        }
        t.$('.cancel',modalTree)[0].onclick=t.$('.icon_close',modalTree)[0].onclick=function () {
            modalTree.style.display = 'none';
        }
    }
}