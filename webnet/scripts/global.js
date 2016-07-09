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
	var frame=document.createElement('img');
	frame.setAttribute('src', 'images/frame.gif');
	frame.setAttribute('alt', '');
	frame.setAttribute('id', 'frame');
	slideshow.appendChild(frame);
	var preview=document.createElement('img');
	preview.setAttribute('src', 'images/slideshow.png');
	preview.setAttribute('alt', 'a alt');
	preview.setAttribute('id', 'preview');
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	// 下面开始循环intro，并根据链接来移动preview
	var links=document.getElementsByTagName('a');
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

// 显示section的函数
// about页面显示选中section的函数
function showSection(id) {
	var sections=document.getElementsByTagName('section');
	for (var i = 0; i < sections.length; i++) {
		if(sections[i].getAttribute('id')!=id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}		
	}
}
// 鼠标点击显示函数
// 全部隐藏，点击显示对应的
function preareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles=document.getElementsByTagName('article');
	if (articles.length==0) return false;
	var navs=articles[0].getElementsByTagName('nav');
	if (navs.length==0) return false;
	var nav=navs[0];
	var links=nav.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		// array=string.split(character)
		// split是分割符作用，我们要的是ID后面的内容
		var sectionId=links[i].getAttribute('href').split('#')[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		links[i].onclick=function () {
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(preareInternalnav);

// 显示图片函数 by photo.html
// 获取图片A地址，控制不让它跳转返回
function showPic(whichpic) {
	if (!document.getElementById('placeholder')) return false;
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if (!document.getElementById('description')) return false;
	if (whichpic.getAttribute("title")) {
		var text=whichpic.getAttribute("title");
	}else{
		var description=document.getElementById('description');
		if (description.firstChild.nodeValue==3) {
			description.firstChild.nodeValue=text;
		}
	}
	return false;
}
// 新建站位符函数
function perparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery'))	return false;
	var placeholder=document.createElement("img");
	placeholder.setAttribute('id', "placeholder");
	placeholder.setAttribute('src', "images/placeholder.gif");
	placeholder.setAttribute('alt', "my image gallery");
	var description=document.createElement("p");
	description.setAttribute('id', "description");
	var desctext=document.createTextNode("choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById('imagegallery');
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
// 重复赋予A链接函数
function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;
	var gallery=document.getElementById('imagegallery');
	var links=gallery.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		links[i].onclick=function () {
			return showPic(this);
		}
	}
}
addLoadEvent(perparePlaceholder);
addLoadEvent(prepareGallery);

// table隔行换色函数
function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName('table');
	for (var i = 0; i < tables.length; i++) {
		var odd=false;
		var rows=tables[i].getElementsByTagName('tr');
		for (var j = 0; j < rows.length; j++) {
			if (odd==true) {
				addClass(rows[j],'odd');
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}
// table高亮鼠标移动高亮函数
function highlightRows() {
	if (!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName('tr');
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function () {
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function () {
			this.className=this.oldClassName;
		}
	}
}
// abbr函数获取
function displayAbbreviations() {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var abbreviations=document.getElementsByTagName('abbr');
	if (abbreviations.length<1) return false;
	var defs=new Array();
	for (var i = 0; i < abbreviations.length; i++) {
		var current_abbr=abbreviations[i];
		if (current_abbr.childNodes.length<1) continue;
		var definiton=current_abbr.getAttribute('title');
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=definiton;
	}
	var dlist=document.createElement('dl');
	for (key in defs) {
		var definiton=defs[key];
		var dtitle=document.createElement('dt');
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc=document.createElement('dd');
		var ddesc_text=document.createTextNode(definiton);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length<1) return false;
	var header=document.createElement('h3');
	var header_text=document.createTextNode('abbreviations');
	header.appendChild(header_text);
	var articles=document.getElementsByTagName('article');
	if (articles.length==0) return false;
	var container =articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

// 下面三段是未测试函数
function focusLabels() {
	if (!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName('label');
	for (var i = labels.length - 1; i >= 0; i--) {
		if (!labels[i].getAttribute('for')) continue;
		labels[i].onclick=function () {
			var id=this.getAttribute('for');
			if (!document.getElementById(id)) return false;
			var element =document.getElementById(id);
			element.foucs();
		}
	}
}
addLoadEvent(focusLabels);
function resetFields(whichform) {
	if (Modernizr.input.placeholder) return;
	for (var i = whichform.length - 1; i >= 0; i--) {
		var element=whichform.elements[i];
		if (element.type=="submit") continue;
		var check=element.placeholder||element.getAttribute('placeholder');
		if(!check) continue;
		element.onfocus=function () {
			var text=this.placeholder||this.getAttribute('placeholder');
			if (this.value==text) {
				this.className='';
				this.value='';
			}
		}
		element.onblur=function () {
			if(this.value==""){
				this.className='placeholder';
				this.value=this.placeholder||this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}
function prepareForms() {
	for (var i = document.form.length - 1; i >= 0; i--) {
		var thisform=document.form[i];
		resetFields(thisform);
	}
}
addLoadEvent(prepareForms)