{

const getObj = (obj) => {
	if(typeof obj == "string")
		return document.querySelector(obj);
	
	return obj;
}

const abort = (isArray, arrayOrStatic, statc) => {
	if(isArray){
		for(const cur of arrayOrStatic){
			if(cur == statc)
				return false;
		}

		return true;
	}

	return (arrayOrStatic != statc);
}

const formatv = (value, type) => (value.toString() + type);

const getFField = (computed, obj, field) => {
	if(computed)
		return parseFloat(window.getComputedStyle(obj)[field]);
	
	return parseFloat(obj.style[field]);
}

class IconSwaper {
	#itself; #current; #icon = {};

	constructor(itself, small, medium, big){
		this.#itself = getObj(itself);

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
		this.#itself = getObj(itself);

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

class SetFieldValueBasedOther{
	#itself; #targetField; #baseField; #percentage; #clearField;
	#validLayouts; // array

	constructor(itself, targetField, baseField, percentage, clearField, validLayouts){
		this.#itself       = getObj(itself);
		this.#targetField  = targetField;
		this.#baseField    = baseField;
		this.#percentage   = percentage;
		this.#clearField   = clearField;
		this.#validLayouts = validLayouts;
	}

	setValue(){
		if(abort(true, this.#validLayouts, WIDTH.check())){
			if(this.#clearField)
				this.#itself.style[this.#targetField] = "";

			return;
		}

		const dim = getFField(true, this.#itself, this.#baseField);

		this.#itself.style[this.#targetField] = String(parseFloat(dim) * this.#percentage) + "px";
	}
}

class IncreaseHitbox {
	#itself; #baseField;
	#validLayout; // array
	#percentage;  // object
	#percStruct;

	get #percOne(){ return 0} // { all }
	get #percDim(){ return 1} // { verticcal, horizontal }
	get #percAll(){ return 2} // { top, bottom, left, right }

	constructor(itself, baseField, validLayout, percentage){
		this.#itself      = getObj(itself);
		this.#baseField   = baseField;
		this.#validLayout = validLayout;
		this.#percentage  = percentage;

		if(this.#percentage.top !== undefined)
			this.#percStruct = this.#percOne;
		else if(this.#percentage.vertical !== undefined)
			this.#percStruct = this.#percDim;
		else
			this.#percStruct = this.#percAll;

		this.#percentage.empty = "";
	}

	#sett(type, field, perc){
		const signal   = (type == "margin") ? "-" : "";
		const cssField = type + field.charAt(0).toUpperCase() + field.slice(1);
		const value    = signal + (getFField(true, this.#itself, this.#baseField) * this.#percentage[perc]).toString() + "px";

		this.#itself.style[cssField] = value;
	}

	#setAll(perc){
		for(const type of ["margin", "padding"])
			for(const field of ["top", "bottom", "left", "right"])
				this.#sett(type, field, perc || field);
	}

	#update(values){
		if(this.#percStruct == this.#percOne){
			this.#setAll();

		}else if(this.#percStruct == this.#percDim){
			for(const pair of [["top", "bottom", "vertical"], ["left", "right", "horizontal"]]){
				this.#sett("margin",  pair[0], pair[2]);
				this.#sett("margin",  pair[1], pair[2]);
				this.#sett("padding", pair[0], pair[2]);
				this.#sett("padding", pair[1], pair[2]);
			}
		}else{
			this.#setAll("all");
		}
	}

	increase(){
		if(abort(true, this.#validLayout, WIDTH.check())){
			this.#setAll("empty");
			return;
		}

		let value = getFField(true, this.#itself, this.#baseField) * this.#percentage;

		this.#update(formatv(value, "px"), formatv(value, "px"));
	}
}

// links below title, in header-nav
Array.from(document.querySelector("header > nav > div#top > section#center > ul").children).forEach((item) => {
	RESPONSIVE_ELEMENTS.once.push(new MoverElement(
		item,
		"header > nav > div#top > section#center > ul",
		"header > nav > div#top > section#right  > ul",
		"header > nav > div#top > section#right  > ul", // TODO: temp
	));
});

// open know-dialog
RESPONSIVE_ELEMENTS.once.push(new IconSwaper(
	"header > nav > div#top > section#right > ul > li > button > i",
	"fa-ellipsis-vertical",
	"fa-info-circle",
	"fa-info-circle", // TODO: temp
));

// header-nav description
RESPONSIVE_ELEMENTS.once.push(new MoverElement(
	"header > nav > div#bottom > p",
	"header > nav > div#bottom",
	"header > nav > div#top > section#center > div",
	"header > nav > div#top > section#center > div", // TODO: temp
));

// donate button from header-popup
RESPONSIVE_ELEMENTS.once.push(new MoverElement(
	"header > dialog#popup > section > nav > span#donate-button > button",
	"header > dialog#popup > section > nav > span#donate-button",
	"header > dialog#popup > section > nav > span#special",
	"header > dialog#popup > section > nav > span#special", // TODO: temp
));

// close button from header-popup
RESPONSIVE_ELEMENTS.once.push(new IconSwaper(
	"header > dialog#popup > section > nav > span#special > button#close-know-dialog > i",
	"fa-xmark",
	"fa-circle-xmark",
	"fa-circle-xmark", // TODO: temp
));

// header-popup set min-height, based its width
RESPONSIVE_ELEMENTS.always.push(new SetFieldValueBasedOther(
	"header > dialog#popup > section",
	"minHeight",
	"width",
	0.761,
	true,
	[WIDTH.small],
));

// header-popup set max-height, based its width
RESPONSIVE_ELEMENTS.always.push(new SetFieldValueBasedOther(
	"header > dialog#popup > section",
	"maxHeight",
	"width",
	1,
	true,
	[WIDTH.small],
));

RESPONSIVE_ELEMENTS.always.push(new IncreaseHitbox(
	"header > nav > div#top > section#right > ul > li > button#open-know-dialog",
	"font-size",
	[WIDTH.small],
	{vertical: 0.25, horizontal: 0.85},
));

RH_FOR_REQUEST_ELEMENTS.projectsItems = {};

RH_FOR_REQUEST_ELEMENTS.projectsItems.resposiveHitbox = (list) => {
	list.forEach((button) => {
		RESPONSIVE_ELEMENTS.always.push(new IncreaseHitbox(
			button,
			"font-size",
			[WIDTH.small],
			{all: 0.675},
		));
	});
};

}
