{

let img;

function newItem(data, level, dest){
	let figure = document.createElement("figure");
	figure.className = "image-skeleton-loading";
	
	img = document.createElement("img");
	img.className = "know-tech-img " + level;
	img.alt   = data.alt;
	img.title = data.title;
	img.src   = data.src;

	img.onload = () => {
		figure.classList.remove("image-skeleton-loading");
	}

	figure.appendChild(img);
	dest.appendChild(figure);
}

fetch(JSON_URL.knowTech).then(response => {return response.json()}).then((json) => {
	let level = ["low", "middle", "high"];
	let tags  = ["programmingLanguages", "markupLanguages", "otherUtilities"];
	let ids   = ["programming-lang", "markup-lang", "other-util"];
	let container;

	for(let i = 0; i < 3; i++){
		container = document.querySelector(`header > dialog#know-dialog > section > ul#knowledge > li > section#${ids[i]} > div`);
		container.removeChild( container.children[0] ); // loading icon

		for(const DATA of json[tags[i]])
			newItem( DATA.icon, "know-level-" + level[DATA.level - 1], container);
	}

	level = tags = ids = container = undefined;
});

img = undefined;

}
