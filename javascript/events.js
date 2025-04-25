{

let lastLayout = null;

const check_all_layouts = (cur) => {
	return (
		(cur == LAYOUT.mini()     && lastLayout != LAYOUT.mini())   ||
		(cur == LAYOUT.small()    && lastLayout != LAYOUT.small())  ||
		(cur == LAYOUT.medium()   && lastLayout != LAYOUT.medium()) ||
		(cur == LAYOUT.big()      && lastLayout != LAYOUT.big())    ||
		(cur == LAYOUT.huge()     && lastLayout != LAYOUT.huge())   ||
		(cur == LAYOUT.infinity() && lastLayout != LAYOUT.infinity())
	);
}

const responsive_elements_methods = (item, currentLayout) => {
	if(item.move_to !== undefined)
		item.move_to( currentLayout );
};

const window_resized = () => {
	let currentLayout = LAYOUT.check();

	if(check_all_layouts( currentLayout )){
		lastLayout = currentLayout;
		
		ResponsiveElements.once.forEach((item) => {
			responsive_elements_methods(item, currentLayout);
		});
	}

	ResponsiveElements.always.forEach((item) => {
		responsive_elements_methods(item, currentLayout);
	});
}

window.addEventListener("DOMContentLoaded", window_resized);
window.addEventListener("resize",           window_resized);

// desable scroll when cursor is above `aside` tag
document.querySelector("aside").addEventListener("wheel", (ev) => {
	ev.preventDefault();
	ev.stopPropagation();
}, {passive: false})

}
