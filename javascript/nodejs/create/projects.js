"use strict";
const FS = require("fs");
const Directory = require(__dirname + "/../../directory.js");

const OutputFile = {
	cards:   Directory.createDir.projects.cards,
	hiCards: Directory.createDir.projects.hiCards,
};

class Img {
	alt; src; title;

	constructor(alt, src, title){
		this.alt   = alt;
		this.src   = src;
		this.title = title;
	}
}

const array_to_string = (array) => {
	let string = "";

	array.forEach((chunk) => {
		string += (chunk + "\n");
	});

	return string;
}

const hiCard = (data) => array_to_string([
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
const card = (data) => array_to_string([
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
		icon: new Img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		title: "foo",
		icon: new Img(Directory.images.foo, "foo", "foo"),
	}
});

project({
	card: {
		title:   "foo",
		pShort:  "pShort",
		pMedium: "pMedium",
		pFull:   "pFull",
		icon: new Img(Directory.images.foo, "foo", "foo"),
	},
	hiCard: {
		title: "foo",
		icon: new Img(Directory.images.foo, "foo", "foo"),
	}
});

// XXX: create elements (end)

FS.writeFile(OutputFile.cards, Cards.join(""), (err) => {
	if(err)
		console.log("Error: 1");
});

FS.writeFile(OutputFile.hiCards, HiCards.join(""), (err) => {
	if(err)
		console.log("Error: 2");
});
