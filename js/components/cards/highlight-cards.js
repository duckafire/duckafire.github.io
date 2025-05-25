"use strict";
{ // start

/*
li
	section
		img
		div
			h1
		/div
		section
			i /i +
			i /i | 1-5
			i /i |
			i /i |
			i /i +
		/section
		section
			button
				i /i
			/button
			button
				a i /i /a
			/button
		/section
	/section
/li
*/

const create_title = (title) => {
	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = title;
	h1.className = "highlight-card-title";

	div.className = "highlight-card-title-container";
	div.appendChild(h1);

	return div;
};

const create_main_languages_list = (data) => {
	const section = document.createElement("section");
	let i;
	
	let quant = 0;

	for(let className of data){
		if(className.charAt(0) != "*" || quant == 5)
			break;

		quant++;

		if(quant == 5)
			className = "fa-solid fa-plus";
		else
			className = "devicon-" + className.slice(1);

		i = document.createElement("i");
		i.className = className;

		section.appendChild(i);
	}

	section.className = "highlight-card-tech";

	return section;
};

const create_computer_layout_buttons = (data) => {
	const section = document.createElement("section");
	const i0 = document.createElement("i");
	const i1 = document.createElement("i");

	const buttons = [];

	for(let i = 0; i < 2; i++){
		buttons.push( document.createElement("button") );
		buttons[i].className = "no-std-style";
	}

	const a = new_anchor("generic-link", data.link);

	section.className = "grid children-on-center inherit-width title-fsize only-at-computer";
	section.style = "--grid-columns: 2;";

	i0.className = data.icon;
	i1.className = "fa-solid fa-square-arrow-up-right";

	a.appendChild(i1);
	buttons[1].appendChild(a);
	buttons[0].appendChild(i0)
	section.appendChild(buttons[0]);
	section.appendChild(buttons[1]);

	return section;
};

const create_layers_of_containers = (data) => {
	const li = document.createElement("li");
	const se = document.createElement("section");

	se.className = "highlight-card";
	se.appendChild( new_img("highlight-card-cover", data.cover_src) );
	se.appendChild( create_title(data.title) );
	se.appendChild( create_main_languages_list(data.used_tech) );
	se.appendChild( create_computer_layout_buttons(data.highlight.home_page) );

	li.className = "swiper-slide";
	li.appendChild(se);

	return li;
};

BUILD_CARD.highlight = (data) => {
	return create_layers_of_containers(data);
}

} // end
