{

const header = {
	openShowMore: document.querySelector("section#header > section#welcome > div#top > div#show-more > i#show-more"),
	closeShowMore: document.querySelector("section#header > section#show-more > div#popup > div#top > i#close-popup"),
	showMore: document.querySelector("section#header > section#show-more"),
};

header.openShowMore.addEventListener("click", () => { header.showMore.hidden = false; });
header.closeShowMore.addEventListener("click", () => { header.showMore.hidden = true; });

}
