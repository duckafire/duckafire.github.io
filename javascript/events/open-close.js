{

const header = {
	welcome: {
		showMore: document.querySelector("section#header > section#welcome > div#top > div#show-more > i#show-more"),
	},
	showMore: document.querySelector("section#header > section#show-more"),
}

header.welcome.showMore.addEventListener("click", () => { header.showMore.hidden = false; });

}
