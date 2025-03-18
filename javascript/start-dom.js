{

const knowTech = [
	document.querySelector("section#header > section#popup > div#container > div#knowledge > div > div > section#programming-languages"),
	document.querySelector("section#header > section#popup > div#container > div#knowledge > div > div > section#markup-languages"),
	document.querySelector("section#header > section#popup > div#container > div#knowledge > div > div > section#other-utilities"),
];

let foo;
const max = [9, 3, 15];

for(let knowId = 0; knowId < knowTech.length; knowId++){
	for(let i = 0; i < max[knowId]; i++){
		foo = document.createElement("img");
		foo.className = "know-tech";
		foo.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg";
		knowTech[knowId].appendChild(foo);
	}
}

}
