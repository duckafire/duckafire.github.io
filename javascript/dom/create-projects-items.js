{

let hidedList = [];

function createProjectsItems(data, dest){
	let foo; // any object
	const ITEM = document.createElement("div");
	ITEM.className = "projects-list-item";

	const IMAGES = {
		container: document.createElement("div"),
		cover: document.createElement("img"),
		coverContainer: document.createElement("div"),
		showcase: {
			container: document.createElement("div"),
			images: document.createElement("div"),   // container
			usedLang: document.createElement("div"), // container
			turnButton: {
				container: document.createElement("div"),
				icon: document.createElement("i"),
			}
		},
	}

	IMAGES.container.id = "images";
	IMAGES.showcase.container.id = "showcase";

	IMAGES.cover.title  = data.cover.title;
	IMAGES.cover.alt    = data.cover.alt;
	IMAGES.cover.src    = data.cover.src;
	IMAGES.cover.onload = () => {IMAGES.coverContainer.classList.remove("image-skeleton-loading")}

	IMAGES.coverContainer.appendChild(IMAGES.cover);
	IMAGES.coverContainer.className = "image-skeleton-loading";

	IMAGES.showcase.images.id          = "images";
	IMAGES.showcase.images.className   = "showcase-container";
	IMAGES.showcase.usedLang.id        = "used-languages";
	IMAGES.showcase.usedLang.className = "showcase-container";
	IMAGES.showcase.usedLang.style.display = "none"; // HIDDEN

	for(let i = 0; i < data.showcase.images.length; i++){
		foo = document.createElement("img");
		foo.title = data.showcase.images[i].title;
		foo.alt   = data.showcase.images[i].alt;
		foo.src   = data.showcase.images[i].src;

		let foo2 = document.createElement("div");
		foo2.className = "image-skeleton-loading";

		foo.onload = () => {foo2.classList.remove("image-skeleton-loading")}

		foo2.appendChild(foo);
		IMAGES.showcase.images.appendChild(foo2);
	}

	for(const ICON of data.showcase.usedLang){
		foo = document.createElement("i");
		foo.title     = ICON.title;
		foo.className = ICON.className;

		IMAGES.showcase.usedLang.appendChild(foo);
	}

	IMAGES.showcase.container.appendChild(IMAGES.showcase.images);
	IMAGES.showcase.container.appendChild(IMAGES.showcase.usedLang);

	IMAGES.showcase.turnButton.icon.id        = "turn-showcase";
	IMAGES.showcase.turnButton.icon.className = "fa-solid fa-repeat";
	IMAGES.showcase.turnButton.container.appendChild(IMAGES.showcase.turnButton.icon);

	IMAGES.showcase.turnButton.icon.addEventListener("click", () => {
		if(IMAGES.showcase.images.style.display != "none"){
			IMAGES.showcase.images.style.display   = "none";
			IMAGES.showcase.usedLang.style.display = "";
			return;
		}

		IMAGES.showcase.images.style.display   = "";
		IMAGES.showcase.usedLang.style.display = "none";
	});

	IMAGES.container.appendChild(IMAGES.coverContainer);
	IMAGES.container.appendChild(IMAGES.showcase.container);
	IMAGES.container.appendChild(IMAGES.showcase.turnButton.container);

	ITEM.appendChild(IMAGES.container);

	const TEXT = {
		container: document.createElement("div"),
		title:  document.createElement("h1"),
		description: document.createElement("p"),
		links: {
			container: document.createElement("div"),
			a: undefined,
			i: undefined,
			span: undefined,
		},
		showHideLinks: {
			container: document.createElement("div"),
			icon: document.createElement("i"),
		}
	};

	TEXT.container.id = "text";

	TEXT.title.textContent = data.title;
	TEXT.description.textContent = data.description;

	TEXT.links.container.id = "links";
	TEXT.links.container.style.display = "none";

	for(const LINK of data.links){
		TEXT.a = document.createElement("a");
		TEXT.a.href  = LINK.address;
		TEXT.a.title = LINK.title;

		TEXT.i = document.createElement("i");
		TEXT.i.className = LINK.className;

		TEXT.span = document.createElement("span");
		TEXT.span.textContent = LINK.textContent;

		TEXT.a.appendChild(TEXT.i);
		TEXT.a.appendChild(TEXT.span);
		TEXT.links.container.appendChild(TEXT.a);
	}

	TEXT.showHideLinks.container.id = "show-hide-links";
	TEXT.showHideLinks.icon.className = "fa-solid fa-caret-down";

	TEXT.showHideLinks.container.appendChild(TEXT.showHideLinks.icon);

	TEXT.showHideLinks.container.addEventListener("click", () => {
		if(TEXT.links.container.style.display != "none"){
			TEXT.links.container.style.display = "none";
			TEXT.showHideLinks.icon.style.transform = "scaleY(1)";
			TEXT.showHideLinks.icon.style.transformOrigin = "50% 50%";
			return;
		}

		TEXT.links.container.style.display = "";
		TEXT.showHideLinks.icon.style.transform = "scaleY(-1)";
		TEXT.showHideLinks.icon.style.transformOrigin = "50% 55%";
	});

	TEXT.container.appendChild(TEXT.title);
	TEXT.container.appendChild(TEXT.description);
	TEXT.container.appendChild(TEXT.links.container);
	TEXT.container.appendChild(TEXT.showHideLinks.container);

	ITEM.appendChild(TEXT.container);

	dest.appendChild(ITEM);

	ITEM.style.display = "none";
	hidedList.push(ITEM);
}

for(const NAME of ["highlight", "other"]){
	const CUR_CONTAINER = document.querySelector(`section#projects > section#${NAME}`);

	fetch(`https://raw.githubusercontent.com/duckafire/nest/refs/heads/work-in-progress/data-json/projects/${NAME}.json`)
	.then(response => response.json())
	.then(data => {

		for(let i = 0; i < data.length; i++)
			createProjectsItems(data[i], CUR_CONTAINER);

		if(NAME == "other")
			CUR_CONTAINER.style.display = "none";

	}).then(() => {

		// remove loading-icon-animated
		CUR_CONTAINER.removeChild(CUR_CONTAINER.children[0]);

		hidedList.forEach(item => {item.style.display = ""});
		hidedList = [];

	}).then(() => {hideList = null;});
}

}
