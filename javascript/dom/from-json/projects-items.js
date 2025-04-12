{

class Listeners {
	ev = {
		visualScreenshot:    [],
		visualTurnButton:    [],
		textualExpandButton: [],
	};
	rh = {
		visualTurnButton: [],
	};
}

const DOM_EVENT_FIELDS = [
	["setImageForHeaderViewer",         "visualScreenshot"   ],
	["swapScreenshotsAndUsedLanguages", "visualTurnButton"   ],
	["expandLinks",                     "textualExpandButton"],
];

const DOM_RESPOSIVE_BEHAVIOR = [
	["resposiveHitbox", "visualTurnButton"],
];

const LISTENERS = [ new Listeners(), new Listeners() ];

let all, visual, textual, foo;
let container, ids = ["highlight", "other"];

const incrementVisual = (data, dest, i) => {
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

		LISTENERS[i].ev.visualScreenshot.push({img: foo, figure: cont});
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
	LISTENERS[i].ev.visualTurnButton.push({
		icon: TURN.icon,
		button: TURN.button,
		divs: {
			images: CONTAINER.section.images,
			icons:  CONTAINER.section.icons,
		}
	});
	LISTENERS[i].rh.visualTurnButton.push(TURN.button);

	TURN.button.appendChild( TURN.icon );

	dest.appendChild(IMAGE.figure);
	dest.appendChild(CONTAINER.itself);
	dest.appendChild(TURN.button);
}

const incrementTextual = (data, dest, i) => {
	const TEXT = {
		h1: document.createElement("h1"),
		p:  document.createElement("p"),
	};

	TEXT.h1.textContent = data.title;

	TEXT.p.textContent  = data.description;
	TEXT.p.className    = "common-font-size";

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
		LINKS.i.className = CUR.className + " FA-wildcard common-font-size";

		LINKS.span = document.createElement("span");
		LINKS.span.textContent = CUR.textContent;
		LINKS.span.className = "common-font-size"

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

	LISTENERS[i].ev.textualExpandButton.push({
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
		for(const fields of DOM_EVENT_FIELDS)
			EV_FOR_REQUEST_ELEMENTS.projectsItems[ fields[0] ](
				LISTENERS[i].ev[ fields[1] ] );

		for(const fields of DOM_RESPOSIVE_BEHAVIOR)
			RH_FOR_REQUEST_ELEMENTS.projectsItems[ fields[0] ](
				LISTENERS[i].rh[ fields[1] ] );

		// they are done after DOM to be loaded, then they
		// must be loading after to be created
		RESPONSIVE_ELEMENTS.always.forEach((item) => {
			if(item.increase !== undefined)
				item.increase();
		});
	});
}

}
