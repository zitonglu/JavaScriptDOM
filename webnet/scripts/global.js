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

// 移动元素的函数
// elementId：要移动的函数
// final_x：目标X轴
// final_y：目标Y轴
// interval:移动的时间
function moveElement(elementId,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementId)) return false;
	var elem=document.getElementById(elementId);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left="0px";
	}
	if (!elem.style.top) {
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if (xpos==final_x && ypos ==final_y){
		return false;
	}
	if (xpos < final_x) {
		dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if (xpos > final_x) {
		dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if (ypos < final_y) {
		dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if (ypos > final_y) {
		dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}
// 幻灯片函数
// 在#intro的元素后面增加一个幻灯片，由鼠标移动到哪儿决定图片位置
function prepareSlideshow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('intro')) return false;
	var intro=document.getElementById('intro');
	var slideshow=document.createElement('div');
	slideshow.setAttribute('id', 'slideshow');
	var preview=document.createElement('img');
	preview.setAttribute('src', 'images/slideshow.png');
	preview.setAttribute('alt', 'a alt');
	preview.setAttribute('id', 'preview');
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	// 下面开始循环intro，并根据链接来移动preview
	var links=intro.getElementsByTagName('a');
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover=function () {
			destination=this.getAttribute('href');
			if (destination.indexOf('index.html')!=-1) {
				moveElement('preview',0,0,5);
			}
			if (destination.indexOf('about.html')!=-1) {
				moveElement('preview',-150,0,5);
			}
			if (destination.indexOf('photos.html')!=-1) {
				moveElement('preview',-300,0,5);
			}
			if (destination.indexOf('live.html')!=-1) {
				moveElement('preview',-450,0,5);
			}
			if (destination.indexOf('contact.html')!=-1) {
				moveElement('preview',-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);