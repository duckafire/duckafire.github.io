"use strict";
const Get = new class{
	css_var(q, v){ return getComputedStyle(document.querySelector(q)).getPropertyValue(v)};
	img_path(f){   return "./resources/images/" + f};
};

const Layout = new class{
	get mobile  (){ return 0; }
	get table   (){ return 1; }
	get computer(){ return 2; }

	check(){
		if(window.innerWidth < 600)  return this.mobile;
		if(window.innerWidth < 1025) return this.table;
		return this.computer;
	}
};

const Data = {
	projectsCards: [],
};

const ResponsiveElements = {
	once:   [], // call once, when the layout is updated
	always: [], // call always that the screen in resized
};
