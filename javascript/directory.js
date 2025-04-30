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
	Directory.createDir = {
		footerFragments: {
			fragment: __dirname + "/../html-chunks/fragment.html",
		},
		projects: {
			cards:   __dirname + "/../html-chunks/cards.html",
			hiCards: __dirname + "/../html-chunks/hi-cards.html",
		},
	};

	Directory.insertInIndexHtml = {
		inputDir:   __dirname + "/../html-chunks/",
		inputHTML:  __dirname + "/../input.html",
		outputHTML: __dirname + "/../index.html",
	}

}else{

}


if(IsNodejs)
	module.exports = Directory;
