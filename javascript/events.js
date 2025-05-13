"use strict";
{

let lastLayout    = null;
let currentLayout = null;

const check_all_layouts = (cur) => {
	return (
		(cur == Layout.mini     && lastLayout != Layout.mini)   ||
		(cur == Layout.small    && lastLayout != Layout.small)  ||
		(cur == Layout.medium   && lastLayout != Layout.medium) ||
		(cur == Layout.big      && lastLayout != Layout.big)    ||
		(cur == Layout.huge     && lastLayout != Layout.huge)   ||
		(cur == Layout.infinity && lastLayout != Layout.infinity)
	);
}

const run_resposive_elements_behavior = (type) => {
	ResponsiveElements[ type ].forEach((item) => {

		if(item.move_to !== undefined)
			item.move_to( currentLayout );

	})
};

const window_resized = () => {
	currentLayout = Layout.check();

	if(check_all_layouts( currentLayout )){
		lastLayout = currentLayout;
		
		run_resposive_elements_behavior("once");
	}

	run_resposive_elements_behavior("always");
}

window.addEventListener("DOMContentLoaded", window_resized);
window.addEventListener("resize",           window_resized);

const open_close_main_burger = (openBurger) => {
	const hide = (item) => { item.classList.add("hidden") }
	const show = (item) => { item.classList.remove("hidden") }

	const container = document.getElementById("main-topbar-container");

	let outContent = hide;
	let insContent = show;
	let coProperty = "remove";
	let boOverflow = "";

	if(openBurger){
		outContent = show;
		insContent = hide;
		coProperty = "add";
		boOverflow = "hidden";
	}

	document.querySelectorAll(".ins-main-burger").forEach((item) => { outContent(item); });
	document.querySelectorAll(".out-main-burger").forEach((item) => { insContent(item); });
	container.classList[ coProperty ]("inherit-dim");
	document.body.style.overflowY = boOverflow;
}

document.getElementById("open-main-burger")
	.addEventListener("click", () => { open_close_main_burger(true) });

document.getElementById("close-main-burger")
	.addEventListener("click", () => { open_close_main_burger(false) });

}
