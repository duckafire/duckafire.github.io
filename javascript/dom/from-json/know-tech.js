{

let figure, img;

function newItem(data, level, dest){
	figure = document.createElement("figure");
	
	img = document.createElement("img");
	img.className = "know-tech-img " + level;
	img.alt   = data.alt;
	img.title = data.title;
	img.src   = data.src;

	console.log(img.className);
	figure.appendChild(img);
	dest.appendChild(figure);
}

fetch(JSON_URL.knowTech).then(response => {return response.json()}).then((json) => {
	let level = ["low", "middle", "high"];
	let tags  = ["programmingLanguages", "markupLanguages", "otherUtilities"];
	let ids   = ["programming-lang", "markup-lang", "other-util"];

	for(let i = 0; i < 3; i++){
		for(const DATA of json[tags[i]]){
			newItem(
				DATA.icon,
				"know-level-" + level[DATA.level - 1],
				document.querySelector(`header > dialog#know-dialog > section > ul#knowledge > li > section#${ids[i]} > div`)
			);
		}
	}

});

figure = img = undefined;

}
