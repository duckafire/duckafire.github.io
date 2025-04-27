"use strict";
const FS = require("fs");

const HTML = {
	inputDir:   __dirname + "/html/",
	inputFile:  __dirname + "/../index.in.html",
	outputFile: __dirname + "/../index.html",
};

const get_ind_level = (data) => {
	let indLevel = 0;
	let length   = data.length;

	while(length-- > 0){
		if(data.charAt(length) == "\t")
			indLevel++;
		else
			break;
	}

	return indLevel;
}

const apply_indentation = (data, indLevel) => {
	let ind = "";

	for(let i = 0; i < indLevel; i++)
		ind += "\t";

	return data.split("\n")
		.map((line, id) => ((id == 0) ? line : ind + line))
		.join("\n");
};

FS.readFile(HTML.inputFile, "utf8", (err, data) => {
	if(err){
		console.log(`It was not possible read the file: ${HTML.inputFile}\n> ${err}`);
		process.exit();
		return;
	}

	const Start    = /<!--@/;
	const End      = /-->/;
	const StartLen = 5;
	const EndLen   = 3;
	const Indent   = /\t+$/;
	const Spaces   = /\s*/g;

	let output = "";
	let buf, HTMLfile, indLevel, inputData;

	while( (buf = Start.exec(data)) !== null ){
		output += buf.input.slice(0, buf.index);
		data    = buf.input.slice(buf.index + StartLen);
		buf     = End.exec(data);

		if(buf === null)
			break;

		indLevel = get_ind_level(output);
		HTMLfile = data.slice(0, buf.index);
		HTMLfile = HTMLfile.replace(Spaces, "");

		try{
			inputData = FS.readFileSync(HTML.inputDir + HTMLfile, "utf8");

			output += apply_indentation(inputData, indLevel);
		}catch(ex){
			output += `<!-- "${HTMLfile}" WAS NOT FOUND -->`;
		}

		data = data.slice(buf.index + EndLen);
	}

	if(output == "")
		output = data;  // none commentary was found
	else
		output += data; // code leftover (no commentaries)

	FS.writeFileSync(HTML.outputFile, output);
});
