{

// open/close dialog

const DIALOG = {
	know: document.querySelector("header > dialog#popup"),
	// "viewer" is opened/closed by projects items showcase images
	other: document.querySelector("main > dialog#other"),
	viewer: document.querySelector("header > dialog#viewer"),
}

document.querySelector("header > nav > div#top > section#right > ul > li > button#open-know-dialog")
	.addEventListener("click", () => {
		document.body.style.overflow = "hidden";
		DIALOG.know.open = true
		DIALOG.know.classList.add("know-dialog");
	})

document.querySelector("header > dialog#popup > section > nav > button#close-know-dialog")
	.addEventListener("click", () => {
		document.body.style.overflow = "";
		DIALOG.know.open = false
		DIALOG.know.classList.remove("know-dialog");
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

document.querySelector("header > dialog#viewer > figure > img")
	.addEventListener("click", (ev) => {ev.stopPropagation()});

DIALOG.viewer.addEventListener("click", () => {
	DIALOG.viewer.open = false;
	document.body.style.overflow = "";
})

// show/hide element (no dialog)

const KNOW_TABS_DISPLAY = [
	["", "none", "none"],
	["none", "", "none"],
	["none", "none", ""],
];

const KNOW_TABS_GROUPS = document.querySelectorAll("section.know-tech-chain");

Array.from(document.querySelector("header > dialog#popup > section > ul#tabs").children).forEach((item, i) => {
	item.addEventListener("click", () => {
		if(KNOW_TABS_GROUPS[i].style.display == KNOW_TABS_DISPLAY[i])
			return;

		KNOW_TABS_GROUPS.forEach((item, j) => {
			item.style.display = KNOW_TABS_DISPLAY[i][j];
		});
	});
});

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
