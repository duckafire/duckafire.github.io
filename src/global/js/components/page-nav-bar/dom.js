"use strict";

/*

Copyright (C) 2025 DuckAfire <https://duckafire.gitlab.io>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

const createPageNavBarMenuItems = () =>
{
	const OPTIONS = [];
	const ITEMS_LIST = [
		["Docker Hub",   "hub.docker.com/u/duckafire"],
		["GitHub",       "github.com/duckafire"],
		["GitLab",       "gitlab.com/duckafire"],
		["itch.io",      "duckafire.itch.io"],
		["NPM Registry", "npmjs.com/~duckafire"],
		["Tic80",        "tic80.com/dev?id=8700"],
	];

	for(const item of ITEMS_LIST)
	{
		OPTIONS.push(
			LI( null,
				A( {role: "button", className: "page-nav-menu-item", href: "https://"+item[1]},
					item[0],
				A),
			LI)
		);
	}

	return OPTIONS;
};

const applyPageNavBarEventListeners = (component) =>
{
	const MANAGER_BTN = component.querySelector(".page-nav-btn");
	const MENU_LIST   = component.querySelector(".page-nav-menu");

	const MANAGER_ICON = MANAGER_BTN.querySelector("[class^=fa-]");

	MANAGER_BTN.addEventListener("click", () =>
	{
		if(MENU_LIST.style.display === "")
		{
			MENU_LIST.style.display = "none";
			document.body.style.overflow = "";
			MANAGER_ICON.classList.remove("fa-xmark");
			MANAGER_ICON.classList.add("fa-bars");
			return;
		}

		MENU_LIST.style.display = "";
		document.body.style.overflow = "hidden";
		MANAGER_ICON.classList.remove("fa-bars");
		MANAGER_ICON.classList.add("fa-xmark");
	});
}

document.body.appendChild( (function(){
	const NAV_BAR =
	NAV( {className: "page-nav-bar"},
		DIV( {className: "page-nav-btn-container"},
			BUTTON( {className: "page-nav-btn"},
				I( {className: "fa-solid fa-bars"}, I),
			BUTTON),
		DIV),
		UL( {className: "page-nav-menu", cssRules: {display: "none"}},
			...createPageNavBarMenuItems(),
		UL),
	NAV);

	applyPageNavBarEventListeners( NAV_BAR );
	return NAV_BAR;
})());
