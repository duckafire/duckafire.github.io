"use strict";

// v0.0.1
// simple NODEjs script to search unused CSS
// classes, based index.html content

const FS = require("fs");

class Base {
	concat(items){
		let strng    = "";
		let filtered = 0;

		items.forEach((item, i) => {
			strng += item + (i + 1 < items.length ? " " : "");
		});

		return strng;
	}

	split_and_rmv_clones(strng){
		return [...new Set( strng.split(" ") )]
	}
}

class HTML extends Base {
	#content;

	constructor(){
		super();
		const data = FS.readFileSync("./index.html", "utf8");

		let items, strng;
		items = this.#get_classes( data );
		items = this.#filter( items );

		strng = this.concat( items );
		items = this.split_and_rmv_clones(strng);

		this.#content = items;
	}

	getContent(){
		return this.#content;
	}

	rmvItem(id){
		this.#content.splice(id, 1);
	}

	#get_classes(data){
		return [...new Set( data.match( /class="([^"]|\n)+"/g ) )];
	}

	#filter(items){
		items = items.map(item => item.replace(/\n/g, " "));
		items = items.map(item => item.replace(/(class=|\t+|")/g, ""));
		items = items.map(item => item.replace(/ $/g, ""));
		return items;
	}
}

class CSS extends Base {
	#content;

	constructor(){
		super();
		const data = FS.readFileSync("./style/css/core.css", "utf8").replace(/\/\*.*\/\/*/g, "");

		let items, strng;
		items = this.#get_classes( data );
		items = this.#filter_pseudo_x( items );

		strng = this.concat( items, item => item != "map" && item != "css");
		items = this.split_and_rmv_clones(strng);

		this.#content = items;
	}

	getContent(){
		return this.#content;
	}

	#get_classes(data){
		return [...new Set( data.match(/\.[a-z][a-z0-9\\:\-]*/g) )];
	}

	#filter_pseudo_x(items){
		let jumpNext = false;

		items = items.map(item => {
			if(item.match(/[^\\]:/g) != null){

				for(let i = 0; i < item.length; i++){
					if(jumpNext)
						jumpNext = false;

					else if(item.charAt(i) == "\\")
						jumpNext = true;

					else if(item.charAt(i) == ":")
						return item.substring(1, i).replace(/\\/g, "");
				}
			}

			return item.substring(1).replace(/\\/g, "");
		});

		return [...new Set( items )];
	}
}

const html = new HTML();
const css  = new CSS();

let   wasUsed = false;
const notUsed = [];

css.getContent().forEach(declared => {
	wasUsed = false;

	html.getContent().forEach(used => {
		if(declared == used){
			wasUsed = true;
			return;
		}
	});

	if(!wasUsed)
		notUsed.push(declared);
});

// regex group; to used in `grep`
const ptn = "[^a-z0-9\\\\:\\-]";
console.log(`${ptn}(` + notUsed.join("|").replace(/\-/g, "\\-") + `)${ptn}`);
