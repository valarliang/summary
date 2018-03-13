const folders = t.$('.folders')[0];
const fEmpty = t.$('.f-empty')[0];

render(0);
function render(id){
    folders.innerHTML = '';
    checkall.className = 'checkedAll';
    let childs = t.getchilds(id);
    if(!childs.length){
        fEmpty.style.display = 'block';
    }else{
        fEmpty.style.display = 'none';
    }
    //i.class = checked
    childs.forEach((e,i)=>{
        const div = t.el('div','file-item',e.id);
        const img = t.el('img');
        img.src = 'img/folder-b.png';
        div.ondblclick = function(){
            renderNav(e.id);
            render(e.id);
        } 
        const span = t.el('span','folder-name');
        span.innerText = e.title;
        const input = t.el('input','editor');
        const ii = t.el('i');
        
        ii.ondblclick=function (ev) {
            ev.cancelBubble=true;
        }
        ii.onclick = function(){
            ii.classList.toggle('checked');
            div.classList.toggle('hov');

            let divs = Array.from(folders.children);
            //checkedAll没选中  checked选中
            checkall.className = divs.every(e=>e.classList.contains('hov'))?'checked':'checkedAll';
        }

        div.appendChild(img);
        div.appendChild(span);
        div.appendChild(input);
        div.appendChild(ii);
        folders.appendChild(div);
    });
}

checkall.onclick = function(){
    let divs = Array.from(folders.children);
    //选中

    this.classList.toggle('checked');

    if(this.classList.contains('checked')){
        divs.forEach(e=>{
            e.classList.add('hov');
            e.children[3].classList.add('checked');
        });
    }else{
        divs.forEach((e)=>{
            e.classList.remove('hov');
            e.children[3].classList.remove('checked')
        });
    }

};


