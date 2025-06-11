"use strict";

const BUILD_CARD = {};
const DATA_JSON = {};

const $ = (query) => {
	const trueQuery = query.slice(1);

	switch(query.charAt(0)){
		case "#": return document.getElementById(trueQuery);
		case "@": return document.querySelectorAll(trueQuery);
		default:  return document.querySelector(query);
	}
}

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
