"use strict";
{

const open_close_main_burger = (openBurger) => {
	const indexs = ["main-topbar-shadow", "burger-topbar", "burger-menu"];
	let   values = ["none", "none", "none"];

	let bodyOverflowY = "";

	if(openBurger){
		values = values.map(() => "");

		bodyOverflowY = "hidden";
	}

	for(let i = 0; i < indexs.length; i++)
		document.getElementById(indexs[i]).style.display = values[i];

	document.body.style.overflowY = bodyOverflowY;
}

document.getElementById("open-main-burger")
	.addEventListener("click", () => { open_close_main_burger(true) });

document.getElementById("close-main-burger")
	.addEventListener("click", () => { open_close_main_burger(false) });

}
