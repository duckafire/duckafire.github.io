function newLoadingIconAnimated(){
	const CONTAINER = document.createElement("div");
	const ICON     = document.createElement("div");

	CONTAINER.className = "loading-icon-animated-container";
	ICON.className      = "loading-icon-animated";

	for(let i = 0; i < 2; i++)
		ICON.appendChild(document.createElement("div"));

	CONTAINER.appendChild(ICON);
	return CONTAINER;
}

{

let knowledge = "section#header > section#popup > div#container > div#knowledge > div > div >";

let queries = [
	knowledge + "section#programming-languages",
	knowledge + "section#markup-languages",
	knowledge + "section#other-utilities",
	"section#projects > section#highlight",
	"section#projects > section#other",
];

let foo;

for(const cur of queries){
	foo = document.querySelector(cur);

	foo.appendChild( newLoadingIconAnimated() );
}

knowledge = queries = null;

}
