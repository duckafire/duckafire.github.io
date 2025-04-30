"use strict";
const Directory = {};
const IsNodejs = (typeof module != "undefined");


const images_path = (file, ext) => {
	ext = "." + ((ext !== undefined) ? ext : "svg");
	return "./resources/images/" + file + ext;
};

Directory.images = {
	foo: images_path("foo"),
};


if(IsNodejs){
	const dirname = (!IsNodejs) ? "" : __dirname + "/";

	Directory.createDir = {
		footerFragments: {
			fragment: dirname + "../html-chunks/fragment.html",
		},
		projects: {
			cards:   dirname + "../html-chunks/cards.html",
			hiCards: dirname + "../html-chunks/hi-cards.html",
		},
	};

	Directory.insertInIndexHtml = {
		inputDir:   dirname + "../html-chunks/",
		inputHTML:  dirname + "../input.html",
		outputHTML: dirname + "../index.html",
	}

}else{

}


if(IsNodejs)
	module.exports = Directory;
