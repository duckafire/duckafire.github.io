class ProjectsCardsBody {
	constructor(isHi, image, text){
		this.isHi  = isHi;
		this.image = { ...image };
		this.text  = { ...text  };
	}
}

class ProjectsCardsImage {
	constructor(title, alt, src){
		this.title = title;
		this.alt = alt;
		this.src= src;
	}
}

class ProjectsCardsText {
	constructor(title, short, full){
		this.title = title;
		this.description = {short, full};
	}
}

DATA.projectsCards.push(
	new ProjectsCardsBody(
		true,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			"./img/foo.png",
		),
		new ProjectsCardsText(
			"title0",
			"short",
			"full",
		)
	),
	new ProjectsCardsBody(
		false,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			"./img/foo.png",
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
			"./img/foo.png",
		),
		new ProjectsCardsText(
			"title2",
			"short",
			"full",
		)
	),
	new ProjectsCardsBody(
		false,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			"./img/foo.png",
		),
		new ProjectsCardsText(
			"title3",
			"short",
			"full",
		)
	),
	new ProjectsCardsBody(
		false,
		new ProjectsCardsImage(
			"property-title",
			"alt",
			"./img/foo.png",
		),
		new ProjectsCardsText(
			"title4",
			"short",
			"full",
		)
	),
);
