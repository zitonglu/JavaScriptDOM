function highlightRows() {
	if (!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName('tr');
	for (var i = rows.length - 1; i >= 0; i--) {
		rows[i].onmouseover=function () {
			this.style.fontWeight="bold";
		}
		rows[i].onmouseout=function () {
			this.style.fontWeight="normal";
		}
	}
}
addLoadEvent(highlightRows)