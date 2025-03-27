{

let all, visual, textual, foo;
let main, ids = ["highlight", "other"];

function incrementVisual(data, dest){
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

		cont.className = "image-skeleton-loading";
		foo.onload = () => {
			cont.classList.remove("image-skeleton-loading");
		}

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
	TURN.icon.addEventListener("click", () => {
		if(CONTAINER.section.images.style.display != "none"){
			CONTAINER.section.images.style.display = "none";
			CONTAINER.section.icons.style.display  = "";
			return;
		}

		CONTAINER.section.images.style.display = "";
		CONTAINER.section.icons.style.display  = "none";
	});

	TURN.button.appendChild( TURN.icon );

	dest.appendChild(IMAGE.figure);
	dest.appendChild(CONTAINER.itself);
	dest.appendChild(TURN.button);
}

function incrementTextual(data, dest){
	const TEXT = {
		h1: document.createElement("h1"),
		p:  document.createElement("p"),
	};

	TEXT.h1.textContent = data.title;
	TEXT.p.textContent  = data.description;

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
	EXPAND.icon.className = "FA-wildcard fa-solid fa-caret-down";

	EXPAND.button.appendChild( EXPAND.icon );

	EXPAND.button.addEventListener("click", () => {
		LINKS.dialog.open = !LINKS.dialog.open;
	});

	dest.appendChild(TEXT.h1);
	dest.appendChild(TEXT.p);
	dest.appendChild(LINKS.dialog);
	dest.appendChild(EXPAND.button);
}

for(let i = 0; i < 2; i++){
	fetch(JSON_URL.projectsItems[i]).then(response => response.json()).then((json) => {
		main = document.querySelector(`main > dialog#${ids[i]} > ul`);

		for(const DATA of json){
			all = document.createElement("li");

			visual = document.createElement("section");
			visual.id = "visual";
			incrementVisual(DATA, visual);

			textual = document.createElement("section");
			textual.id = "textual";
			incrementTextual(DATA, textual);

			all.appendChild(visual);
			all.appendChild(textual);

			main.appendChild(all);
		}

	});
}

all = visual = textual = foo = undefined;
main = id = undefined;

}
