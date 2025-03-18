function createProjectsItems(data, dest){

	let foo; // any object
	const item = document.createElement("div");
	item.className = "projects-list-item";

	const images = {
		container: document.createElement("div"),
		cover: document.createElement("img"),
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

	images.container.id = "images";
	images.showcase.container.id = "showcase";

	images.cover.src = data.cover;

	images.showcase.images.id          = "images";
	images.showcase.images.className   = "showcase-container";
	images.showcase.usedLang.id        = "used-languages";
	images.showcase.usedLang.className = "showcase-container";
	images.showcase.usedLang.style.display = "none"; // HIDDEN

	for(let i = 0; i < data.showcase.images.length; i++){
		foo = document.createElement("img");
		foo.src = JSON.stringify(data.showcase.images[i]);

		images.showcase.images.appendChild(foo);
	}

	for(const icon of data.showcase.usedLang){
		foo = document.createElement("i");
		foo.title     = icon.title;
		foo.className = icon.className;

		images.showcase.usedLang.appendChild(foo);
	}

	images.showcase.container.appendChild(images.showcase.images);
	images.showcase.container.appendChild(images.showcase.usedLang);

	images.showcase.turnButton.icon.id        = "turn-showcase";
	images.showcase.turnButton.icon.className = "fa-solid fa-repeat";
	images.showcase.turnButton.container.appendChild(images.showcase.turnButton.icon);

	images.container.appendChild(images.cover);
	images.container.appendChild(images.showcase.container);
	images.container.appendChild(images.showcase.turnButton.container);

	item.appendChild(images.container);

	const text = {
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

	text.container.id = "text";

	text.title.textContent = data.title;
	text.description.textContent = data.description;

	text.links.container.id = "links";

	for(const link of data.links){
		text.a = document.createElement("a");
		text.a.href  = link.address;
		text.a.title = link.title;

		text.i = document.createElement("i");
		text.i.className = link.className;

		text.span = document.createElement("span");
		text.span.textContent = link.textContent;

		text.a.appendChild(text.i);
		text.a.appendChild(text.span);
		text.links.container.appendChild(text.a);
	}

	text.showHideLinks.container.id = "show-hide-links";
	text.showHideLinks.icon.className = "fa-solid fa-caret-down";

	text.showHideLinks.container.appendChild(text.showHideLinks.icon);

	text.container.appendChild(text.title);
	text.container.appendChild(text.description);
	text.container.appendChild(text.links.container);
	text.container.appendChild(text.showHideLinks.container);

	item.appendChild(text.container);

	dest.appendChild(item);
}

for(const name of ["highlight", "other"]){
	fetch(`https://raw.githubusercontent.com/duckafire/nest/refs/heads/work-in-progress/data-json/projects/${name}.json`)
	.then(response => response.json())
	.then(data => {

		for(let i = 0; i < data.length; i++)
			createProjectsItems(data[i], document.querySelector(`section#projects > section#${name}`));

	});
}
