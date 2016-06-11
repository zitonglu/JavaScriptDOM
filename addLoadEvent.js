function addLoadEvent(func) {
	var oldonload = window.onload;
	if (tpeof window.onload!='function' ){
		window.onload=func;
	}else{
		window.onload=function () {
			oldonload;
			func();
		}
	}
}