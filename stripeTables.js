function stripeTables() {
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName('table'); 
	var odd , rows;
	for (var i = tables.length - 1; i >= 0; i--) {
		odd = false;
		rows = tables[i].getElementsByTagName('tr');
		for (var j = rows.length - 1; j >= 0; j--) {
			if (odd == true){
				rows[j].style.backgroundColor = "#ffc";
				odd = false;
			}else{
				odd = true;
			}
		}
	}
}
addLoadEvent(stripeTables);