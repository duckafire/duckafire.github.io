function newLoadingIconAnimated(){
	const container = document.createElement("div");
	const icon     = document.createElement("div");

	container.className = "loading-icon-animated-container";
	icon.className      = "loading-icon-animated";

	for(let i = 0; i < 2; i++)
		icon.appendChild(document.createElement("div"));

	container.appendChild(icon);
	return container;
}

{

const knowledge = "section#header > section#popup > div#container > div#knowledge > div > div >";

const queries = [
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

}
