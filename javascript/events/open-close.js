{

const header = {
	openPopup: document.querySelector("section#header > section#presentation > div#header > div#open-popup > i"),
	closePopup: document.querySelector("section#header > section#popup > div#container > div#header > i#close-popup"),
	popup: document.querySelector("section#header > section#popup"),
};

header.openPopup.addEventListener("click",  () => { header.popup.style.display = "initial"; });
header.closePopup.addEventListener("click", () => { header.popup.style.display = "none";    });

}
