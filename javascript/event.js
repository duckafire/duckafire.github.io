{

// open/close dialog

const DIALOG = {
	know: document.querySelector("header > dialog#popup"),
	// "viewer" is opened/closed by projects items showcase images
	other: document.querySelector("main > dialog#other"),
	viewer: document.querySelector("header > dialog#viewer"),
}

function closeKnowDialog(){
	document.body.style.overflow = "";
	DIALOG.know.open = false
	DIALOG.know.classList.remove("know-dialog");
}

document.querySelector("header > nav > div#top > section#right > ul > li > button#open-know-dialog")
	.addEventListener("click", () => {
		document.body.style.overflow = "hidden";
		DIALOG.know.open = true
		DIALOG.know.classList.add("know-dialog");

		RESPONSIVE_ELEMENTS.always.forEach((item, i) => {
			// first two are same element:
			// header > dialog%popup > section
			if(i > 1)
				return;

			item.setValue();
		});
	});

document.querySelector("header > dialog#popup > section > nav > span#special > button#close-know-dialog")
	.addEventListener("click", closeKnowDialog);

DIALOG.know.children[0].addEventListener("click", (ev) => { ev.stopPropagation() });
DIALOG.know.addEventListener("click", closeKnowDialog);

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

let saveKnowTabsId = 0;
const KNOW_TABS_DISPLAY = [
	["", "none", "none"],
	["none", "", "none"],
	["none", "none", ""],
];

const KNOW_TABS_GROUPS = document.querySelectorAll("li.know-tech-item");

Array.from(document.querySelector("header > dialog#popup > section > ul#tabs").children).forEach((item, i) => {
	item.addEventListener("click", () => {
		if(KNOW_TABS_GROUPS[i].style.display == KNOW_TABS_DISPLAY[i])
			return;

		saveKnowTabsId = i;

		KNOW_TABS_GROUPS.forEach((item, j) => {
			item.style.display = KNOW_TABS_DISPLAY[i][j];
		});
	});
});

// resize screen/window

let currentLayout;

function windowResized(){
	// once
	const CUR = WIDTH.check();

	if(( currentLayout != WIDTH.small  && CUR == WIDTH.small)  ||
		(currentLayout != WIDTH.medium && CUR == WIDTH.medium) ||
		(currentLayout != WIDTH.big    && CUR == WIDTH.big)){

		currentLayout = CUR;
		RESPONSIVE_ELEMENTS.once.forEach((item) => {
			if(item.moveIt !== undefined)
				item.moveIt();

			else if(item.swapIcon !== undefined)
				item.swapIcon();
		});

		KNOW_TABS_GROUPS.forEach((item, i) => {
			if(CUR == WIDTH.small)
				item.style.display = KNOW_TABS_DISPLAY[saveKnowTabsId][i];
			else // TODO (temp) if(CUR == WIDTH.medium)
				item.style.display = "";
		});
	}

	// always
	RESPONSIVE_ELEMENTS.always.forEach((item) => {
		if(item.setValue !== undefined)
			item.setValue();
	});
}

window.addEventListener("DOMContentLoaded", windowResized);
window.addEventListener("resize",           windowResized);

}
