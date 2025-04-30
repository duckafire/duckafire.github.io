"use strict";
const FS = require("fs");
const Directory = require(__dirname + "/../../directory.js");
const Tools = require(__dirname + "/tools.js");

const OutputFile = {
	cards:   Directory.createDir.projects.cards,
	hiCards: Directory.createDir.projects.hiCards,
};

const hiCard = (data) => Tools.functions.arrayToString([
	`<li class="swiper-slide">`,
	`	<section class="hi-card">`,
	`		<figure class="circle-radius">`,
	`			<img src="${data.icon.alt}" alt="${data.icon.src}" title="${data.icon.title}" />`,
	`		</figure>`,
	`		<h1>`,
	`			${data.title}`,
	`		</h1>`,
	`	</section>`,
	`</li>`,
]);

// TODO: store "popup" data in `li` "data-*"
const card = (data) => Tools.functions.arrayToString([
	`<li class="co-cards">`,
	`	<section class="card">`,
	`		<div class="title-description-container">`,
	`			<h1>`,
	`				${data.title}`,
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
	Cards.push(card(data.card));
	HiCards.push(hiCard(data.hiCard));
};

// XXX: create elements (start)

project({
	card: {
		title:   "foo",
		pShort:  "pShort",
		pMedium: "pMedium",
		pFull:   "pFull",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		title: "foo",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	}
});

project({
	card: {
		title:   "foo",
		pShort:  "pShort",
		pMedium: "pMedium",
		pFull:   "pFull",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		title: "foo",
		icon: new Tools.classes.img(Directory.images.foo, "foo", "foo"),
	}
});

// XXX: create elements (end)

Tools.functions.writeInFile(OutputFile.cards,   Cards);
Tools.functions.writeInFile(OutputFile.hiCards, HiCards);
