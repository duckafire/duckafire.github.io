"use strict";
{ // start

class ProjectsCardsBody {
	#_isHi; image; text;

	constructor(isHi, image, text){
		this.#_isHi = isHi;
		this.image  = { ...image };
		this.text   = { ...text  };
	}

	isHi(){ return this.#_isHi; }
}

class ProjectsCardsImage {
	title; alt; src;

	constructor(title, alt, src){
		this.title = title;
		this.alt = alt;
		this.src= src;
	}
}

class ProjectsCardsText {
	title; description;

	constructor(title, short, full){
		this.title = title;
		this.description = {short, full};
	}
}

Data.projectsCards.push(
	new ProjectsCardsBody(
		true,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			Images.foo,
		),
		new ProjectsCardsText(
			"title0",
			"short",
			"full",
		)
	),
	new ProjectsCardsBody(
		true,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			Images.foo,
		),
		new ProjectsCardsText(
			"title1",
			"short",
			"full",
		)
	),
	new ProjectsCardsBody(
		true,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			Images.foo,
		),
		new ProjectsCardsText(
			"title2",
			"short",
			"full",
		)
	),
	new ProjectsCardsBody(
		true,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			Images.foo,
		),
		new ProjectsCardsText(
			"title3",
			"short",
			"full",
		)
	),
	new ProjectsCardsBody(
		true,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			Images.foo,
		),
		new ProjectsCardsText(
			"title4",
			"short",
			"full",
		)
	),
);

} // end
