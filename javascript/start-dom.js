{

const knowledgeTechnolog = [
	document.querySelector("section#header > section#show-more > div#popup > div#knowledge > div > div > section#programming-languages"),
	document.querySelector("section#header > section#show-more > div#popup > div#knowledge > div > div > section#markup-languages"),
	document.querySelector("section#header > section#show-more > div#popup > div#knowledge > div > div > section#other-utilities"),
];

let foo;
const max = [9, 3, 5];

for(let knowId = 0; knowId < knowledgeTechnolog.length; knowId++){
	for(let i = 0; i < max[knowId]; i++){
		foo = document.createElement("img");
		foo.className = "knowledge-technolog-image";
		foo.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg";
		knowledgeTechnolog[knowId].appendChild(foo);
	}
}

}
