"use strict";
{

let lastLayout    = null;
let currentLayout = null;

const check_all_layouts = (cur) => {
	return (
		(cur == Layout.mobile   && lastLayout != Layout.mobile)   ||
		(cur == Layout.table    && lastLayout != Layout.table)    ||
		(cur == Layout.computer && lastLayout != Layout.computer)
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
	const indexs = ["main-topbar", "burger-topbar", "burger-menu"];
	let   values = ["", "none", "none"];

	let bodyOverflowY = "";

	if(openBurger){
		values = values.map(cur => cur == "" ? "none" : "");

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
