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

{ // start

const createInterPageMenu = () =>
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

	let attr;

	for(const item of ITEMS_LIST)
	{
		attr = {
			role: "button",
			className: "nav-menu-item soft-live-full-light-btn",
			href: "https://"+item[1],
		};

		OPTIONS.push(
			LI( null,
				A( attr, item[0], A),
			LI)
		);
	}

	return UL( {className: "nav-menu min-screen-width", cssRules: {display: "none"}},
		...OPTIONS,
	UL);
};

const evOpenMainBurgerMenu = (component) =>
{
	const component   = component;
	const MANAGER_BTN = component.querySelector(".nav-btn");
	const MENU_LIST   = component.querySelector(".nav-menu");

	const MANAGER_ICON = MANAGER_BTN.querySelector("[class^=fa-]");

	MANAGER_BTN.addEventListener("click", () =>
	{
		if(MENU_LIST.style.display === "")
		{
			unsetInertToBrothers( component );
			MENU_LIST.style.display = "none";
			document.body.style.overflow = "";
			MANAGER_ICON.classList.remove("fa-xmark");
			MANAGER_ICON.classList.add("fa-bars");
			return;
		}

		setInertToBrothers( component );
		MENU_LIST.style.display = "";
		document.body.style.overflow = "hidden";
		MANAGER_ICON.classList.remove("fa-bars");
		MANAGER_ICON.classList.add("fa-xmark");
	});
}

const applyPageNavBarEventListeners = (component) =>
{
	evOpenMainBurgerMenu(component);
}

const cssRules = {
	"--bg-bar":  "var(--BG_HIGH)",
	"--bg-menu": "var(--BG_DEFAULT)",
	"--bg-line": "var(--BG_SUPER_HIGH)",
	"--fg":      "var(--FG_DEFAULT)",
};

const NAV_BAR =
NAV( {className: "nav-bar min-screen-width", cssRules},
	DIV( {className: "nav-btn-container"},
		BUTTON( {className: "nav-btn live-full-light-btn"},
			I( {className: "fa-solid fa-bars"}, I),
		BUTTON),
	DIV),
	createInterPageMenu(),
NAV);

applyPageNavBarEventListeners( NAV_BAR );

document.body.appendChild( NAV_BAR );

} // end
