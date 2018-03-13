const treeMenu=t.$('.tree-menu')[0];

getTree(-1);

function getTree(pid) {
    treeMenu.innerHTML = renderTree(0,pid);
    treeMenu.onclick=function (ev) {
        if(ev.target.tagName === 'SPAN'){
            render(ev.target.dataset.index*1);
            renderNav(ev.target.dataset.index*1);
        }
        if(ev.target.tagName === 'I'){
            if (ev.target.parentNode.className.indexOf('close')!=-1){
                ev.target.parentNode.className='tree-title open';
                ev.target.parentNode.nextElementSibling.style.display='block';
            }else{
                ev.target.parentNode.className='tree-title close';
                ev.target.parentNode.nextElementSibling.style.display='none';
            }
        }
    }
}

function renderTree(num,pid){
    let html = `<ul style="padding-left:${num++*5}px;display:block">`;
    t.getchilds(pid).forEach(e=>{
        let arr = t.getchilds(e.id);
        html += `<li>
            <div class="tree-title ${arr.length?'open':''}">
                <i></i>
                <span data-index="${e.id}">${e.title}</span>
            </div>
            ${renderTree(num,e.id)}`;
    });
    html += '</li></ul>';
    return html;
}
