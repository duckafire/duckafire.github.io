/*
{

let img;
const LISTENERS = [];

const newItem = (data, level, dest) => {
	let figure = document.createElement("figure");
	figure.className = "image-skeleton-loading";
	
	img = document.createElement("img");
	img.className = "know-tech-img " + level;
	img.alt   = data.alt;
	img.title = data.title;
	img.src   = data.src;

	LISTENERS.push({img: img, figure: figure});

	figure.appendChild(img);
	dest.appendChild(figure);
}

fetch(JSON_URL.knowTech).then(response => {return response.json()}).then((json) => {
	let level = ["low", "middle", "high"];
	let tags  = ["programmingLanguages", "markupLanguages", "otherUtilities"];
	let ids   = ["programming-lang", "markup-lang", "other-util"];
	let container;

	for(let i = 0; i < 3; i++){
		container = document.querySelector("header > dialog#popup > section > ul#knowledge > li > section#" + ids[i]);
		container.removeChild( container.children[0] ); // loading icon

		for(const DATA of json[tags[i]])
			newItem( DATA.icon, "know-level-" + level[DATA.level - 1], container);
	}

}).then(() => {
	EV_FOR_REQUEST_ELEMENTS.knowTech.removeImageSkeleton(LISTENERS);
	
});

}
*/
