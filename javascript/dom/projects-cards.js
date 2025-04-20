{

const DEST    = document.getElementById("projects-cards");
const DEST_HI = document.getElementById("projects-cards-highlight");

const createGenericCardContainer = (dest, liClassList, seClassList) => {
	const li = document.createElement("li");
	const se = document.createElement("section");

	li.className = liClassList;
	se.className = seClassList;

	dest.appendChild(li);
	li.appendChild(se);

	return se;
}

const createTextSet = (isShort, data, dClassList, hClassList, pClassList) => {
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

const createImageSet = (imgData, figClassList) => {
	const fig = document.createElement("figure");
	const img = document.createElement("img");

	img.title = imgData.title;
	img.alt   = imgData.alt;
	img.src   = imgData.src;

	fig.className = figClassList;
	fig.appendChild(img);

	return fig;
}

const createHiCard = (card) => {
	let container = createGenericCardContainer(
		DEST_HI,
		"co-hi--projects-cards",
		"hi--card border-r-based-vw medium--hover-up-scale",
	);
	let figur = createImageSet(card.image, "circle-radius");
	let title = document.createElement("h1");

	title.textContent = card.text.title;

	container.appendChild(figur);
	container.appendChild(title);
}

const createCard = (card) => {
	const container = createGenericCardContainer(
		DEST,
		"co--projects-cards",
		"card border-r-based-vw big--hover-up-scale",
	);

	const text = createTextSet(true, card.text, "title-description-container", "", "");
	const imag = createImageSet(card.image, "circle-radius");

	container.appendChild(text);
	container.appendChild(imag);
}

DATA.projectsCards.forEach(card => {
	if(card.isHi)
		createHiCard(card);

	createCard(card);
});

}
