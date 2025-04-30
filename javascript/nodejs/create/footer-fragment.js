"use strict";
const FS = require("fs");
const Directory = require(__dirname + "/../../directory.js");
const Tools = require(__dirname + "/tools.js");

const Output = Directory.createDir.footerFragments.fragment;
const List = [];

const fragment = (data) => {
	const head = [
		`<li>`,
		`	<section>`,
		`		<h1 class="title">`,
		`			${data.title}`,
		`		</h1>`,
	];

	const body = [];

	for(const pdata of data.paragraphs){
		head.push(`		<a class="link" href="${pdata.href}" title="${pdata.title}">`);
		head.push(`			${pdata.textContent.replace(/\s/g, " ")}`);
		head.push(`		</a>`);
	}

	const tail = [
		`	</section>`,
		`</li>`,
	];

	const full = [].concat(head, body, tail);

	List.push(Tools.functions.arrayToString(full));
};

// XXX: create elements (start)

for(let i = 0; i < 8; i++){ // TODO: remove this `for loop`
	fragment({
		title: "FOO" + i,
		paragraphs: [
			new Tools.classes.hyperLink(
				"foo",
				"foo",
				"#"
			),
			new Tools.classes.hyperLink(
				"foo",
				"foo",
				"#"
			),
			new Tools.classes.hyperLink(
				"foo",
				"foo",
				"#"
			),
			new Tools.classes.hyperLink(
				"foo",
				"foo",
				"#"
			),
		],
	});
}

// XXX: create elements (end)

Tools.functions.writeInFile(Output, List);
