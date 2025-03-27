{

let foo;

// open/close dialog

const DIALOG = {
	know: document.querySelector("header > dialog#know-dialog"),
	// "viewer" is opened/closed by projects items showcase images
	other: document.querySelector("main > dialog#other"),
}

document.querySelector("header > nav > div#top > section#right > ul > li > button#open-know-dialog")
	.addEventListener("click", () => {DIALOG.know.open = true})

document.querySelector("header > dialog#know-dialog > section > nav > button#close-know-dialog")
	.addEventListener("click", () => {DIALOG.know.open = false})

foo = document.querySelector("main > button");

foo.addEventListener("click", () => {
	DIALOG.other.open = !DIALOG.other.open;
})

foo = undefined;

}
