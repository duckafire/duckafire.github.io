{

const header = {
	openPopup: document.querySelector("section#header > section#presentation > div#header > div#open-popup > i"),
	closePopup: document.querySelector("section#header > section#popup > div#container > div#header > i#close-popup"),
	popup: document.querySelector("section#header > section#popup"),
};

header.openPopup.addEventListener("click",  () => {
	header.popup.style.display = "";
	document.body.style.overflow = "hidden"
});

header.closePopup.addEventListener("click", () => {
	header.popup.style.display = "none";
	document.body.style.overflow = "initial";
});


const projects = {
	other: document.querySelector("section#projects > section#other"),
	expandOther: document.querySelector("section#projects > section#expand-projects"),
};

projects.expandOther.addEventListener("click", () => {
	if(projects.other.style.display != "none"){
		projects.other.style.display = "none";
		projects.expandOther.style.transform = "scaleY(1)";
		return;
	}

	projects.other.style.display = "";
	projects.expandOther.style.transform = "scaleY(-1)";
});

}
