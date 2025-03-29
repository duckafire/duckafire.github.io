{

let item = window.getComputedStyle(document.querySelector(".fa-github"));

let checker = setInterval(() => {

	if(item.fontFamily.includes("Font Awesome")){
		document.querySelectorAll(".FA-wildcard").forEach((elem) => {
			elem.classList.remove("FA-wildcard");
		});

		clearInterval(checker);
	}

}, 250);

}
