var isFirefox=/Firefox/i.test(navigator.userAgent)?true:false;
var unMouseBtn=function(e){
  var e = e || window.event;
  if(e.wheelDelta && e.ctrlKey){//IE/Opera/Chrome e.wheelDelta±120
     e.preventDefault?e.preventDefault():e.returnValue=false;
  }else if(e.detail && e.ctrlKey){//Firefox e.detail±3
     e.preventDefault?e.preventDefault():e.returnValue=false;
  }
};
var mousewheelevt=isFirefox?"DOMMouseScroll":"mousewheel";
if(document.attachEvent){//IE/Opera/Chrome
  document.attachEvent("on"+mousewheelevt,unMouseBtn);
}else if(document.addEventListener){//Firefox
  document.addEventListener(mousewheelevt,unMouseBtn,false);
}
var unCtrl=function(e){
  var e = e || window.event;
  var isFirefox=(/Firefox/i.test(navigator.userAgent))?true:false;
  var code=isFirefox?"109,107,173,61":"109,107,189,187";
  if(e.ctrlKey && code.indexOf(e.keyCode)!=-1){
     e.preventDefault?e.preventDefault():e.returnValue=false;
  }
};
document.onkeydown=unCtrl;
