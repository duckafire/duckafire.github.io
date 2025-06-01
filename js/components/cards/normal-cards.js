"use strict";
{ // start

/*
li
	section
		section
			h1 /h1
			p /p
		/section
		div /div
		img
	/section
/li
*/

const text_content = (title, description) => {
	const section = document.createElement("section");
	const h1 = document.createElement("h1");
	const p = document.createElement("p");

	h1.textContent = title;
	p.textContent = description;

	section.className = "card-text-field";
	section.appendChild(h1);
	section.appendChild(p);

	return section;
};

const separation_line = (isVert) => {
	const div = document.createElement("div");

	if(isVert){
		div.className = "vert-line only-at-mobile";
		div.style = "--parent-height: 125px;";
	}else{
		div.className = "hori-line only-not-at-mobile";
		div.style = "--parent-width: 93.32%; --line-height: 4px;";
	}

	return div;
};

const create_layers_of_containers = (data) => {
	const li = document.createElement("li");
	const se = document.createElement("section");

	se.className = "card";
	se.appendChild( text_content(data.title, data.description) );
	se.appendChild( separation_line(true) );
	se.appendChild( separation_line(false) );
	se.appendChild( new_img("card-cover", data.cover_src) );

	li.className = "card-dim tlegacy:bg-1";
	li.appendChild(se);

	return li;
};

BUILD_CARD.normal = (data) => {
	return create_layers_of_containers(data);
}

} // end
