"use strict";
const Directory = {};


const images_path = (file, ext) => {
	ext = "." + ((ext !== undefined) ? ext : "svg");
	return "./resources/images/" + file + ext;
};

Directory.images = {
	foo: images_path("foo"),
};


if(module){
	Directory.createDir = {
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


if(module)
	module.exports = Directory;
