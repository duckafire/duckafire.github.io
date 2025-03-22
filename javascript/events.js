{

window.setTimeout(() => {
	const ITEM = window.getComputedStyle(document.querySelector(".fa-github"));

	const REMOVE_WILDCARD_CHAR = setInterval(() => {
		if(ITEM.fontFamily.includes("Font Awesome")){
			document.querySelectorAll(".FA-wildcard").forEach((elem) => {
				elem.classList.remove("FA-wildcard");
			});

			clearInterval(REMOVE_WILDCARD_CHAR);
		}
	}, 100);

}, 1500);


const HEADER = {
	openPopup: document.querySelector("section#header > section#presentation > div#header > div#open-popup > i"),
	closePopup: document.querySelector("section#header > section#popup > div#container > div#header > i#close-popup"),
	popup: document.querySelector("section#header > section#popup"),
};

HEADER.openPopup.addEventListener("click",  () => {
	HEADER.popup.style.display = "";
	document.body.style.overflow = "hidden"
});

HEADER.closePopup.addEventListener("click", () => {
	HEADER.popup.style.display = "none";
	document.body.style.overflow = "initial";
});


const PROJECTS = {
	other: document.querySelector("section#projects > section#other"),
	expandOther: document.querySelector("section#projects > section#expand-projects"),
};

PROJECTS.expandOther.addEventListener("click", () => {
	if(PROJECTS.other.style.display != "none"){
		PROJECTS.other.style.display = "none";
		PROJECTS.expandOther.style.transform = "scaleY(1)";
		return;
	}

	PROJECTS.other.style.display = "";
	PROJECTS.expandOther.style.transform = "scaleY(-1)";
});

}
