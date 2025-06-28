"use strict";
{ // start

/*
li
	button
		a
			i /i
		/a
	/button
/li
*/

const data_json = [
	// a: link | i: className
	["fa-brands fa-itch-io",  "https://duckafire.itch.io"],
	["fa-brands fa-linkedin", "https://www.linkedin.com/in/bruno-c-s-silva"],
	["fa-brands fa-github",   "https://github.com/duckafire"],
];

const create = (data, noMobile) => {
	const li = document.createElement("li");
	const button = document.createElement("button");
	const a = new_anchor("no-std-style inherit-cursor", data[1]);
	const i = document.createElement("i");

	button.className = "no-std-style title-fsize hover-pointer tlegacy:icon-btn" + (noMobile ? " only-not-at-mobile" : "");
	i.className = data[0];

	a.appendChild(i)
	button.appendChild(a);
	li.appendChild(button);

	return li;
}

const containers_list = [
	$("#topbar-menu-list"),
	$("#burger-menu-list"),
];

for(let i = 0; i < containers_list.length; i++)
	for(const data of data_json)
		containers_list[i].appendChild( create(data, i == 0) );

} // end
