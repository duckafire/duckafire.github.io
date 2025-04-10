{

let foo;

const newIcon = () => {
	const CONTAINER = document.createElement("div");
	const ICON      = document.createElement("div");

	CONTAINER.className = "loading-icon-animated-container";
	ICON.className      = "loading-icon-animated";

	for(let i = 0; i < 2; i++)
		ICON.appendChild(document.createElement("div"));

	CONTAINER.appendChild(ICON);
	return CONTAINER;
}

const knowledge = (sectionId) => {
	return "header > dialog#popup > section > ul#knowledge > li > section#" + sectionId;
}

let queries = [
	{query: knowledge("programming-lang"),  need: null},
	{query: knowledge("markup-lang"),       need: null},
	{query: knowledge("other-util"),        need: null},
	{query: "main > dialog#highlight > ul", need: "li"},
	{query: "main > dialog#other > ul",     need: "li"},
];

for(const cur of queries){
	if(cur.need == null){
		document.querySelector(cur.query).appendChild(newIcon());
		continue;
	}

	foo = document.createElement(cur.need);
	foo.appendChild(newIcon());
	document.querySelector(cur.query).appendChild(foo);
}

}
