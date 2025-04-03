{

class IconSwaper {
	#itself; #current; #icon = {};

	constructor(itself, small, medium, big){
		this.#itself = (typeof itself == "string") ? document.querySelector(itself) : itself;

		this.#icon.small  = (small  != null) ? small.split(" ")  : null;
		this.#icon.medium = (medium != null) ? medium.split(" ") : null;
		this.#icon.big    = (big    != null) ? big.split(" ")    : null;

		// initial icon
		this.#current = this.#icon.small;
	}

	#swap(newIcon){
		if(newIcon === null)
			return;

		this.#itself.classList.remove(...this.#current);
		this.#itself.classList.add(...newIcon);
		this.#current = newIcon;
	}

	swapIcon(){
		if(WIDTH.check() == WIDTH.small)
			this.#swap(this.#icon.small);

		else if(WIDTH.check() == WIDTH.medium)
			this.#swap(this.#icon.medium);

		else
			this.#swap(this.#icon.big);
	}
}

class MoverElement {
	#itself; #destine = {};

	constructor(itself, small, medium, big){
		this.#itself = (typeof itself == "string") ? document.querySelector(itself) : itself;

		this.#destine.small  = document.querySelector(small);
		this.#destine.medium = document.querySelector(medium);
		this.#destine.big    = document.querySelector(big);
	}

	moveIt() {
		if(WIDTH.check() == WIDTH.small)
			this.#destine.small.appendChild(this.#itself);

		else if(WIDTH.check() == WIDTH.medium)
			this.#destine.medium.appendChild(this.#itself);

		else
			this.#destine.big.appendChild(this.#itself);
	}
}

// links below title, in header-nav
Array.from(document.querySelector("header > nav > div#top > section#center > ul").children).forEach((item) => {
	RESPONSIVE_ELEMENTS.push(new MoverElement(
		item,
		"header > nav > div#top > section#center > ul",
		"header > nav > div#top > section#right  > ul",
		"header > nav > div#top > section#right  > ul", // TODO: temp
	));
});

// open know-dialog
RESPONSIVE_ELEMENTS.push(new IconSwaper(
	"header > nav > div#top > section#right > ul > li > button > i",
	"fa-ellipsis-vertical",
	"fa-info-circle",
	"fa-info-circle", // TODO: temp
));

// header-nav description
RESPONSIVE_ELEMENTS.push(new MoverElement(
	"header > nav > div#bottom > p",
	"header > nav > div#bottom",
	"header > nav > div#top > section#center > div",
	"header > nav > div#top > section#center > div", // TODO: temp
));

// donate button from header-popup
RESPONSIVE_ELEMENTS.push(new MoverElement(
	"header > dialog#popup > section > nav > span#donate-button > button",
	"header > dialog#popup > section > nav > span#donate-button",
	"header > dialog#popup > section > nav > span#special",
	"header > dialog#popup > section > nav > span#special", // TODO: temp
));

RESPONSIVE_ELEMENTS.push(new IconSwaper(
	"header > dialog#popup > section > nav > span#special > button#close-know-dialog > i",
	"fa-xmark",
	"fa-circle-xmark",
	"fa-circle-xmark", // TODO: temp
));

}
