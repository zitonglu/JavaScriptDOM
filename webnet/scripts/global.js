// 加载函数
// 使函数在网页加载完以后运行
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload=func;
	}else{
		window.onload=function () {
			oldonload();
			func();
		}
	}
}
// 在元素后插入元素函数
// newElement:新元素名称；targetElement：插入目标元素
function insertAfter(newElement,targetElement) {
	var parent=targetElement.parentNode;
	if (parent.lastchild==targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
// 增加样式函数
// 在相应式样下增加一个class名称
function addClass(element,value) {
	if (!element.className) {
		element.className=value;
	}else{
		newClassName=element.className;
		newClassName+=' ';
		newClassName+=value;
		element.className=newClassName;
	}
}
// 导航当前页面特殊化函数
// 当前页面的对应导航增加一个.here式样；
// 并且因为特性在相应页面的body增加一个对应ID
function highlightPage() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers=document.getElementsByTagName('header');
	if (headers.length==0) return false;
	var navs =headers[0].getElementsByTagName('nav');
	if (navs.length==0) return false;
	var links=navs[0].getElementsByTagName('a');
	var linkurl;
	for (var i = 0; i < links.length; i++) {
		linkurl=links[i].getAttribute('href');
		// 如果网址里面包含了链接地址，则增加
		if (window.location.href.indexOf(linkurl)!=-1) {
			links[i].className="here";
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id', linktext);
		}
	}
}
addLoadEvent(highlightPage);