function menu(){
	document.getElementById("menu").open();
}

function load(page){
	document.getElementById("nav").resetToPage(page);
	document.getElementById("menu").close();
}