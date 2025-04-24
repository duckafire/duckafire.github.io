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

const create_text_set = (isShort, data, dClassList, hClassList, pClassList) => {
	let d = document.createElement("div");
	let h = document.createElement("h1");
	let p = document.createElement("p");

	d.className = dClassList;
	h.className = hClassList;
	p.className = pClassList;

	h.textContent = data.title;
	p.textContent = data.description[(isShort) ? "short" : "full"];

	d.appendChild(h);
	d.appendChild(p);

	return d;
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
		"co-projects-cards",
		"card",
	);

	const text = create_text_set(true, card.text, "title-description-container", "", "");
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
