"use strict";
const Get = new class{
	css_var(q, v){ return getComputedStyle(document.querySelector(q)).getPropertyValue(v)};
	img_path(f){   return "./resources/images/" + f};
};

const Layout = new class{
	get mini    (){ return 0; }
	get small   (){ return 1; }
	get medium  (){ return 2; }
	get big     (){ return 3; }
	get huge    (){ return 4; }
	get infinity(){ return 5; }

	check(){
		const w = window.innerWidth;

		if(w < 480)  return this.mini;
		if(w < 600)  return this.small;
		if(w < 801)  return this.medium;
		if(w < 1025) return this.big;
		if(w < 1281) return this.huge;
		return this.infinity;
	}
};

const Data = {
	projectsCards: [],
};

const ResponsiveElements = {
	once:   [], // call once, when the layout is updated
	always: [], // call always that the screen in resized
};
