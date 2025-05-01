"use strict";
const FS = require("fs");
const Directory = require(__dirname + "/../../directory.js");
const Tools = require(__dirname + "/tools.js");

const OutputFile = {
	cards:   Directory.createDir.projects.cards,
	hiCards: Directory.createDir.projects.hiCards,
};

const hiCard = (data, share, prop) => Tools.functions.arrayToString([
	`<li class="swiper-slide"`,
	`	data-${prop.creationDate.ident}="${prop.creationDate.value}"`,
	`>`,
	`	<section class="hi-card">`,
	`		<figure class="circle-radius">`,
	`			<img src="${data.icon.alt}" alt="${data.icon.src}" title="${data.icon.title}" />`,
	`		</figure>`,
	`		<h1>`,
	`			${share.title}`,
	`		</h1>`,
	`	</section>`,
	`</li>`,
]);

// TODO: store "popup" data in `li` "data-*"
const card = (data, share, prop) => Tools.functions.arrayToString([
	`<li class="co-cards"`,
	`	data-${prop.creationDate.ident}="${prop.creationDate.value}"`,
	`>`,
	`	<section class="card">`,
	`		<div class="title-description-container">`,
	`			<h1>`,
	`				${share.title}`,
	`			</h1>`,
	`			<p class="desc short-desc">`,
	`				${data.pShort.replace(/\s/g, " ")}`,
	`			</p>`,
	`			<p class="desc medium-desc">`,
	`				${data.pMedium.replace(/\s/g, " ")}`,
	`			</p>`,
	`			<p class="desc full-desc">`,
	`				${data.pFull.replace(/\s/g, " ")}`,
	`			</p>`,
	`		</div>`,
	`		<figure class="circle-radius">`,
	`			<img src="${data.icon.alt}" alt="${data.icon.src}" title="${data.icon.title}" />`,
	`		</figure>`,
	`	</section>`,
	`</li>`,
]);

const Cards   = [];
const HiCards = [];

const project = (data) => {
	Cards.push(  card(  data.card,   data.share, data.properties));
	HiCards.push(hiCard(data.hiCard, data.share, data.properties));
};

// XXX: create elements (start)

project({
	share: {
		title:   "Lorem ipsum odor",
	},
	card: {
		pShort:  "Lorem ipsum odor amet, adipiscing",
		pMedium: "Lorem ipsum odor amet, consectetuer adipiscing Potenti ultricies inceptos,",
		pFull:   "Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis.",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	properties: {
		creationDate: new Tools.classes.property("date", "0000 00 00"),
	}
});

project({
	share: {
		title:   "Lorem",
	},
	card: {
		pShort:  "Lorem ipsum odor amet, consectetuer adipiscing",
		pMedium: "Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos,",
		pFull:   "Lorem ipsum odor amet, consectetuer adipiscing elit. inceptos, quam facilisis aliquam vehicula quis.",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	properties: {
		creationDate: new Tools.classes.property("date", "0000 00 00"),
	}
});

project({
	share: {
		title:   "Lorem consectetuer ipsum amet",
	},
	card: {
		pShort:  "Lorem ipsum odor amet, consectetuer adipiscing",
		pMedium: "Lorem ipsum odor amet, adipiscing elit. Potenti ultricies inceptos,",
		pFull:   "Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis.",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	properties: {
		creationDate: new Tools.classes.property("date", "0000 00 00"),
	}
});

project({
	share: {
		title:   "Lorem elit",
	},
	card: {
		pShort:  "Lorem ipsum odor, adipiscing",
		pMedium: "Lorem ipsum adipiscing elit. Potenti ultricies inceptos,",
		pFull:   "Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis.",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	properties: {
		creationDate: new Tools.classes.property("date", "0000 00 00"),
	}
});

project({
	share: {
		title:   "Lorem ipsum",
	},
	card: {
		pShort:  "Lorem ipsum odor amet, consectetuer adipiscing",
		pMedium: "Lorem ipsum odor amet, consectetuer ultricies inceptos,",
		pFull:   "Lorem ipsum amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis.",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	properties: {
		creationDate: new Tools.classes.property("date", "0000 00 00"),
	}
});

// XXX: create elements (end)

Tools.functions.writeInFile(OutputFile.cards,   Cards);
Tools.functions.writeInFile(OutputFile.hiCards, HiCards);
