"use strict";
{ // start

const elem_dest    = document.getElementById("projects-cards");
const elem_dest_hi = document.getElementById("projects-cards-highlight");

const create_generic_card_container = (dest, liClassList, seClassList) => {
	const li = document.createElement("li");
	const se = document.createElement("section");

	li.className = liClassList;
	se.className = seClassList;

	dest.appendChild(li);
	li.appendChild(se);

	return se;
}

const create_text_set = (data, diClassList, h1ClassList, p0ClassList, p1ClassList) => {
	let di = document.createElement("div");
	let h1 = document.createElement("h1");
	let p0 = document.createElement("p");
	let p1 = document.createElement("p");

	di.className = diClassList;
	h1.className = h1ClassList;
	p0.className = p0ClassList + " card-descr-short";
	p1.className = p1ClassList + " card-descr-full";

	h1.textContent = data.title;
	p0.textContent = data.description.short;
	p1.textContent = data.description.full;

	di.appendChild(h1);
	di.appendChild(p0);
	di.appendChild(p1);

	return di;
}

const create_image_set = (imgData, figClassList) => {
	const fig = document.createElement("figure");
	const img = document.createElement("img");

	img.title = imgData.title;
	img.alt   = imgData.alt;
	img.src   = imgData.src;

	fig.className = figClassList;
	fig.appendChild(img);

	return fig;
}

const create_hi_card = (card) => {
	let container = create_generic_card_container(
		elem_dest_hi,
		"swiper-slide",
		"hi-card",
	);
	let figur = create_image_set(card.image, "circle-radius");
	let title = document.createElement("h1");

	title.textContent = card.text.title;

	container.appendChild(figur);
	container.appendChild(title);
}

const create_card = (card) => {
	const container = create_generic_card_container(
		elem_dest,
		"co-cards",
		"card",
	);

	const text = create_text_set(card.text, "title-description-container", "", "", "");
	const imag = create_image_set(card.image, "circle-radius");

	container.appendChild(text);
	container.appendChild(imag);
}

Data.projectsCards.forEach(card => {
	if(card.isHi())
		create_hi_card(card);

	create_card(card);
});

} // end
