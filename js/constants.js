"use strict";

const $ = (query, root) => {
	const trueQuery = query.slice(1);

	if(root == undefined)
		root = document;

	switch(query.charAt(0)){
		case "#": return root.getElementById(trueQuery);
		case "@": return root.querySelectorAll(trueQuery);
		default:  return root.querySelector(query);
	}
}

const get_image = (fileName) => "./resources/images/" + fileName;
const da_github = (path) => "https://github.com/duckafire/" + path;
const work_in_progress = () => {alert("Trabalho em progresso")};

const new_template = (id) => $(id).content.cloneNode(true);

const new_img = (className, src, alt, title) => {
	const img = document.createElement("img");

	img.className = className;
	img.src = src;
	img.alt = alt || " ";

	img.loading = "lazy";

	if(title !== undefined)
		img.title = title;

	return img;
}

const new_anchor = (className, href, title) => {
	const a = document.createElement("a");

	a.className = className
	a.href = href;

	a.rel = "noopener noreferrer";

	if(title !== undefined)
		a.title = title;

	return a;
}

class FromTo {
	#templateId;

	constructor(id0, id1){
		this.#templateId = id0;

		this.template   = new_template(id0);
		this.container  = $(id1);
		this.createElem = null;
	}

	appendTemplate(){
		this.container.appendChild(this.template);

		this.template = new_template(this.#templateId);
	}

	clear(){
		this.template   = null;
		this.container  = null;
		this.createElem = null;
	}
}
