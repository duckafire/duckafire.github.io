"use strict";
const FS = require("fs");


// CLASSES

class Img {
	alt; src; title;

	constructor(alt, src, title){
		this.alt   = alt;
		this.src   = src;
		this.title = title;
	}
}


// FUNCTIONS

const array_to_string = (array) => {
	let string = "";

	array.forEach((chunk) => {
		string += (chunk + "\n");
	});

	return string;
};

const write_in_file = (file, items) => {
	FS.writeFile(file, items.join(""), (err) => {
		if(err)
			console.log(err);
	});
};


module.exports = {
	classes: {
		img: Img,
	},
	functions: {
		arrayToString: array_to_string,
		writeInFile: write_in_file,
	},
}
