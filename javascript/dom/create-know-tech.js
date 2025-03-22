{

let hideList = [];

function createKnowTech(data, className, dest){
	const IMG = document.createElement("img");
	IMG.title = data.title;
	IMG.alt   = data.alt;
	IMG.src   = data.src;
	IMG.className = className;

	dest.appendChild(IMG);

	IMG.style.display = "none";
	hideList.push(IMG);
}

fetch("https:raw.githubusercontent.com/duckafire/nest/refs/heads/work-in-progress/data-json/header/welcome-popup-know.json")
.then(response => response.json())
.then(data => {
	let level;
	const CLASS_LAST_NAME = [undefined, "low", "middle", "high"];

	for(let i = 0; i < data.programmingLanguages.length; i++){
		level = data.programmingLanguages[i].level;
		createKnowTech(
			data.programmingLanguages[i].icon,
			"know-tech know-tech-level-" + CLASS_LAST_NAME[level],
			document.getElementById("programming-languages")
		);
	}

	for(let i = 0; i < data.markupLanguages.length; i++){
		level = data.markupLanguages[i].level;
		createKnowTech(
			data.markupLanguages[i].icon,
			"know-tech know-tech-level-" + CLASS_LAST_NAME[level],
			document.getElementById("markup-languages")
		);
	}

	for(let i = 0; i < data.otherUtilities.length; i++){
		level = data.otherUtilities[i].level;
		createKnowTech(
			data.otherUtilities[i].icon,
			"know-tech know-tech-level-" + CLASS_LAST_NAME[level],
			document.getElementById("other-utilities")
		);
	}
}).then(() => {

	const CONTAINER = [
		document.getElementById("programming-languages"),
		document.getElementById("markup-languages"),
		document.getElementById("other-utilities"),
	];

	// remove loading-icon-animated
	CONTAINER.forEach(item => {item.removeChild(item.children[0])});

	hideList.forEach(item => {item.style.display = ""});

}).then(() => {hideList = null});

}
