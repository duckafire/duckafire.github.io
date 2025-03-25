{

function newLoadingIconAnimated(){
	const CONTAINER = document.createElement("div");
	const ICON      = document.createElement("div");

	CONTAINER.className = "loading-icon-animated-container";
	ICON.className      = "loading-icon-animated";

	for(let i = 0; i < 2; i++)
		ICON.appendChild(document.createElement("div"));

	CONTAINER.appendChild(ICON);
	return CONTAINER;
}

function knowledge(sectionId){
	return `header > dialog#know-dialog > section > ul#knowledge > li > section#${sectionId} > div`;
}

let queries = [
	knowledge("programming-lang"),
	knowledge("markup-lang"),
	knowledge("other-util"),
];

for(const cur of queries)
	document.querySelector(cur).appendChild( newLoadingIconAnimated() );

knowledge = queries = undefined;

}
