{

const LISTENERS = [
	{ visualScreenshot: [], visualTurnButton: [], textualExpandButton: [] },
	{ visualScreenshot: [], visualTurnButton: [], textualExpandButton: [] },
];

let all, visual, textual, foo;
let container, ids = ["highlight", "other"];

function incrementVisual(data, dest, i){
	const IMAGE = {
		figure: document.createElement("figure"),
		img:    document.createElement("img"),
	};

	IMAGE.img.alt   = data.cover.alt;
	IMAGE.img.title = data.cover.title;
	IMAGE.img.src   = data.cover.src;

	IMAGE.figure.className = "image-skeleton-loading";
	IMAGE.img.onload = () => {
		IMAGE.figure.classList.remove("image-skeleton-loading");
	}

	IMAGE.figure.appendChild(IMAGE.img);

	const CONTAINER = {
		itself: document.createElement("div"),
		section: {
			images: document.createElement("section"),
			icons:  document.createElement("section"),
		},
	};

	for(const CUR of data.showcase.images){
		let cont = document.createElement("figure");
		foo = document.createElement("img");

		foo.alt   = CUR.alt;
		foo.title = CUR.title;
		foo.src   = CUR.src;

		LISTENERS[i].visualScreenshot.push({img: foo, figure: cont});
		cont.className = "image-skeleton-loading";

		cont.appendChild(foo);
		CONTAINER.section.images.appendChild(cont);
	}

	for(const CUR of data.showcase.usedLang){
		foo = document.createElement("i");

		foo.className = CUR.className + " FA-wildcard";
		foo.title     = CUR.title;

		CONTAINER.section.icons.appendChild(foo);
	}

	CONTAINER.section.images.id = "screenshots";
	CONTAINER.section.icons.id  = "used-langs";
	CONTAINER.section.icons.style.display = "none";

	CONTAINER.itself.appendChild( CONTAINER.section.images );
	CONTAINER.itself.appendChild( CONTAINER.section.icons );

	const TURN = {
		button: document.createElement("button"),
		icon:   document.createElement("i"),
	};

	TURN.icon.className = "FA-wildcard fa-solid fa-repeat";
	LISTENERS[i].visualTurnButton.push({
		icon: TURN.icon,
		button: TURN.button,
		divs: {
			images: CONTAINER.section.images,
			icons:  CONTAINER.section.icons,
		}
	});

	TURN.button.appendChild( TURN.icon );

	dest.appendChild(IMAGE.figure);
	dest.appendChild(CONTAINER.itself);
	dest.appendChild(TURN.button);
}

function incrementTextual(data, dest, i){
	const TEXT = {
		h1: document.createElement("h1"),
		p:  document.createElement("p"),
	};

	TEXT.h1.textContent = data.title;
	TEXT.h1.className   = "projects-title-size";
	TEXT.p.textContent  = data.description;

	// container to LINKS and EXPAND
	const NO_TEXT = document.createElement("div");

	const LINKS = {
		dialog: document.createElement("dialog"),
		ul:     document.createElement("ul"),
		li: undefined, a: undefined, i: undefined, span: undefined,
	};

	for(const CUR of data.links){
		LINKS.li = document.createElement("li");

		LINKS.a = document.createElement("a");
		LINKS.a.href  = CUR.href;
		LINKS.a.title = CUR.title;
		LINKS.a.className = "border-r-based-w";

		LINKS.i = document.createElement("i");
		LINKS.i.className = CUR.className + " FA-wildcard";

		LINKS.span = document.createElement("span");
		LINKS.span.textContent = CUR.textContent;

		LINKS.a.appendChild( LINKS.i );
		LINKS.a.appendChild( LINKS.span );
		LINKS.li.appendChild( LINKS.a );
		LINKS.ul.appendChild( LINKS.li );
	}

	LINKS.ul.className = "list-no-style";
	LINKS.dialog.appendChild( LINKS.ul );

	const EXPAND = {
		button: document.createElement("button"),
		icon:   document.createElement("i"),
	}

	EXPAND.button.id = "expand-links";
	EXPAND.button.className = "border-r-based-w";

	EXPAND.icon.className = "FA-wildcard fa-solid fa-caret-down";

	EXPAND.button.appendChild( EXPAND.icon );

	LISTENERS[i].textualExpandButton.push({
		icon: EXPAND.icon,
		button: EXPAND.button,
		dialog: LINKS.dialog,
	});

	NO_TEXT.appendChild(LINKS.dialog);
	NO_TEXT.appendChild(EXPAND.button);

	dest.appendChild(TEXT.h1);
	dest.appendChild(TEXT.p);
	dest.appendChild(NO_TEXT);
}

function setScreenshotEvent(i){
	if(LISTENERS[i].visualScreenshot.length == 0)
		return;

	LISTENERS[i].visualScreenshot.forEach((cur) => {
		cur.img.addEventListener("click", () => {
			if(WIDTH.check() == WIDTH.big)
				return;

			document.querySelector("header > dialog#viewer").open = true;
			document.querySelector("header > dialog#viewer > figure > img").src = cur.img.src;
			document.body.style.overflow = "hidden";
		});

		cur.img.onload = () => {
			cur.figure.classList.remove("image-skeleton-loading");
		}
	});
}

function setTurnButtonEvent(i){
	if(LISTENERS[i].visualTurnButton.length == 0)
		return;

	LISTENERS[i].visualTurnButton.forEach((cur) => {
		cur.button.addEventListener("click", () => {
			RESTART_CSS_ANIMATION(cur.icon, "single-loading-rotation 0.35s 1");

			if(cur.divs.images.style.display != "none"){
				cur.divs.images.style.display = "none";
				cur.divs.icons.style.display  = "";
				return;
			}

			cur.divs.images.style.display = "";
			cur.divs.icons.style.display  = "none";
		});
	});
}

function setExpandButtonEvent(i){
	if(LISTENERS[i].textualExpandButton.length == 0)
		return;

	LISTENERS[i].textualExpandButton.forEach((cur) => {
		cur.button.addEventListener("click", () => {
			if(cur.dialog.open){
				cur.dialog.open = false;
				cur.icon.style.transform = "scale(1)";
				return;
			}
			cur.dialog.open = true;
			cur.icon.style.transform = "scale(-1)";
		});
	});
}

for(let i = 0; i < 2; i++){
	fetch(JSON_URL.projectsItems[i]).then(response => response.json()).then((json) => {
		container = document.querySelector(`main > dialog#${ids[i]} > ul`);
		container.removeChild( container.children[0] ); // loading icon

		for(const DATA of json){
			all = document.createElement("li");
			all.className = "border-r-based-w";

			visual = document.createElement("section");
			visual.id = "visual";
			incrementVisual(DATA, visual, i);

			textual = document.createElement("section");
			textual.id = "textual";
			incrementTextual(DATA, textual, i);

			all.appendChild(visual);
			all.appendChild(textual);

			container.appendChild(all);
		}

	}).then(() => {
		setScreenshotEvent(i);
		setTurnButtonEvent(i);
		setExpandButtonEvent(i);
	});
}

}
