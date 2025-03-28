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

// resize screen/window

let currentLayout;

function windowResized(){
	const cur = WIDTH.check();

	if(( currentLayout != WIDTH.small  && cur == WIDTH.small)  ||
		(currentLayout != WIDTH.medium && cur == WIDTH.medium) ||
		(currentLayout != WIDTH.big    && cur == WIDTH.big)){

		currentLayout = cur;
		RESPONSIVE_ELEMENTS.forEach((item) => {
			if(item.moveIt !== undefined)
				item.moveIt();

			if(item.swapIcon !== undefined)
				item.swapIcon();
		});
	}
}

window.addEventListener("DOMContentLoaded", windowResized);
window.addEventListener("resize",           windowResized);

}
