{

// open/close dialog

const DIALOG = {
	know: document.querySelector("header > dialog#know-dialog"),
	// "viewer" is opened/closed by
	// projects items showcase images
}

document.querySelector("header > nav > div#top > section#right > ul > li > button#open-know-dialog")
	.addEventListener("click", () => {DIALOG.know.open = true})

document.querySelector("header > dialog#know-dialog > section > nav > button#close-know-dialog")
	.addEventListener("click", () => {DIALOG.know.open = false})

}
