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
	["#", "fa-brands fa-github"],
	["#", "fa-brands fa-linkedin"],
	["#", "fa-brands fa-itch-io"],
];

const create = (data, noMobile) => {
	const li = document.createElement("li");
	const button = document.createElement("button");
	const a = new_anchor("no-std-style generic-link title-fsize", data[0]);
	const i = document.createElement("i");

	button.className = "no-std-style hover-grow active-shrink" + (noMobile ? " only-not-at-mobile" : "");
	i.className = data[1];

	a.appendChild(i)
	button.appendChild(a);
	li.appendChild(button);

	return li;
}

const containers_list = [
	document.getElementById("topbar-menu-list"),
	document.getElementById("burger-menu-list"),
];

for(let i = 0; i < containers_list.length; i++)
	for(const data of data_json)
		containers_list[i].appendChild( create(data, i == 0) );

} // end
