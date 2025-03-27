{

// open/close dialog

const DIALOG = {
	know: document.querySelector("header > dialog#know-dialog"),
	// "viewer" is opened/closed by projects items showcase images
	other: document.querySelector("main > dialog#other"),
}

document.querySelector("header > nav > div#top > section#right > ul > li > button#open-know-dialog")
	.addEventListener("click", () => {
		document.body.style.overflow = "hidden";
		DIALOG.know.open = true
	})

document.querySelector("header > dialog#know-dialog > section > nav > button#close-know-dialog")
	.addEventListener("click", () => {
		DIALOG.know.open = false
		document.body.style.overflow = "";
	})

const expOtherProj = document.querySelector("main > button");

expOtherProj.addEventListener("click", () => {
	if(DIALOG.other.open){
		DIALOG.other.open   = false;
		expOtherProj.style.transform = "scaleY(1)";
		return;
	}
	DIALOG.other.open   = true;
	expOtherProj.style.transform = "scaleY(-1)";
})

}
