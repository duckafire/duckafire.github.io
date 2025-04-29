"use strict";
const get_css_variable = (query, variable) => {
	return getComputedStyle(document.querySelector(query)).getPropertyValue(variable);
}

const LAYOUT = new class{
	mini(){     return 0; }
	small(){    return 1; }
	medium(){   return 2; }
	big(){      return 3; }
	huge(){     return 4; }
	infinity(){ return 5; }

	check(){
		const width = window.innerWidth;

		if(width < 480)  return this.mini();
		if(width < 600)  return this.small();
		if(width < 801)  return this.medium();
		if(width < 1025) return this.big();
		if(width < 1281) return this.huge();
		return this.infinity();
	}
};

const Data = {
	projectsCards: [],
};

const ResponsiveElements = {
	once:   [], // call once when the layout is updated
	always: [], // call event that the screen in resized
};
