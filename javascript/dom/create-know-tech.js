function createKnowTech(data, className, dest){
	const img = document.createElement("img");
	img.title = data.title;
	img.src   = data.src;
	img.className = className;

	dest.appendChild(img);
}

fetch("https:raw.githubusercontent.com/duckafire/nest/refs/heads/work-in-progress/data-json/header/welcome-popup-know.json")
.then(response => response.json())
.then(data => {
	let level;
	const classLastName = [undefined, "low", "middle", "high"];

	for(let i = 0; i < data.programmingLanguages.length; i++){
		level = data.programmingLanguages[i].level;
		createKnowTech(
			data.programmingLanguages[i].icon,
			"know-tech know-tech-level-" + classLastName[level],
			document.getElementById("programming-languages")
		);
	}

	for(let i = 0; i < data.markupLanguages.length; i++){
		level = data.markupLanguages[i].level;
		createKnowTech(
			data.markupLanguages[i].icon,
			"know-tech know-tech-level-" + classLastName[level],
			document.getElementById("markup-languages")
		);
	}

	for(let i = 0; i < data.otherUtilities.length; i++){
		level = data.otherUtilities[i].level;
		createKnowTech(
			data.otherUtilities[i].icon,
			"know-tech know-tech-level-" + classLastName[level],
			document.getElementById("other-utilities")
		);
	}
});
