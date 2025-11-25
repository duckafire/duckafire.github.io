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

const createPageColorSchemeOpt = (scheme) =>
{
	const ATTR = {
		role: "button",
		class: "nav-cscheme-opt live-light-btn",
		dataSets: {
			enable: (scheme === PageColorScheme.getCurrent()) ? "1" : "0",
		},
	};

	return LI( ATTR,
		I( {class: PageColorScheme.classIconOf( scheme ) }),
		scheme.charAt(0).toUpperCase() + scheme.slice(1),
	LI);
};

const createPageColorSchemeMenu = () =>
{
	const LIST = UL( {class: "nav-cscheme-opt-menu"}, UL);

	for(const SCHEME of PageColorScheme.list())
		LIST.appendChild( createPageColorSchemeOpt( SCHEME ) );

	return DIV( {className: "nav-cscheme-opt-menu-container min-screen-width", cssRules: {display: "none"}},
		LIST,
	DIV);
}

const evMainBurgerMenu = (component) =>
{
	const MANAGER_BTN = component.querySelector(".nav-menu-man-btn");
	const BTN_CONTAIN = component.querySelector(".nav-btn-container");
	const MENU_LIST   = component.querySelector(".nav-menu");

	const MANAGER_ICON = MANAGER_BTN.querySelector("[class^=fa-]");

	MANAGER_BTN.addEventListener("click", () =>
	{
		if(MENU_LIST.style.display === "")
		{
			// closing
			unsetInertToBrothers( component );
			MENU_LIST.style.display = "none";
			document.body.style.overflow = "";
			MANAGER_ICON.classList.remove("fa-xmark");
			MANAGER_ICON.classList.add("fa-bars");
			MANAGER_BTN.classList.remove("live-full-light-btn");
			MANAGER_BTN.classList.add("live-light-btn");
			BTN_CONTAIN.dataset.burgerMenuOpen = "0";
			return;
		}

		// openning
		setInertToBrothers( component );
		MENU_LIST.style.display = "";
		document.body.style.overflow = "hidden";
		MANAGER_ICON.classList.remove("fa-bars");
		MANAGER_ICON.classList.add("fa-xmark");
		MANAGER_BTN.classList.remove("live-light-btn");
		MANAGER_BTN.classList.add("live-full-light-btn");
		BTN_CONTAIN.dataset.burgerMenuOpen = "1";
	});
};

const evPageColorSchemeMenu = (component) =>
{
	const MANAGER_BTN = component.querySelector(".nav-cscheme-man-btn")
	const MENU_LIST   = component.querySelector(".nav-cscheme-opt-menu-container");

	const MANAGER_ICON = MANAGER_BTN.querySelector("[class^=fa-]");

	MANAGER_BTN.addEventListener("click", () =>
	{
		if(MENU_LIST.style.display === "")
		{
			// closing
			MENU_LIST.style.display = "none";
			return;
		}

		// openning
		MENU_LIST.style.display = "";
	});

	MENU_LIST.querySelectorAll(".nav-cscheme-opt").forEach(opt =>
	{
		opt.addEventListener("click", () =>
		{
			if(opt.dataset.enable === "1")
				return;

			MENU_LIST.querySelector('.nav-cscheme-opt[data-enable="1"]').dataset.enable = "0";
			opt.dataset.enable = "1";

			let scheme = opt.textContent.toLowerCase();
			MANAGER_ICON.className = PageColorScheme.classIconOf( scheme );
			PageColorScheme.update( scheme );
		});
	});
};

const applyPageNavBarEventListeners = (component) =>
{
	evMainBurgerMenu(component);
	evPageColorSchemeMenu(component);
};

const cssRules = {
	"--bg-bar":  "var(--BG_HIGH)",
	"--bg-menu": "var(--BG_DEFAULT)",
	"--bg-line": "var(--BG_SUPER_HIGH)",
	"--fg":      "var(--FG_DEFAULT)",
};

const NAV_BAR =
NAV( {className: "nav-bar min-screen-width", cssRules},
	DIV( {className: "nav-btn-container"},
		BUTTON( {className: "nav-cscheme-man-btn live-light-btn"},
			I( {className: PageColorScheme.getCurrent(true)}, I),
		BUTTON),
		BUTTON( {className: "nav-menu-man-btn live-light-btn"},
			I( {className: "fa-solid fa-bars"}, I),
		BUTTON),
	DIV),
	createPageColorSchemeMenu(),
	createInterPageMenu(),
NAV);

applyPageNavBarEventListeners( NAV_BAR );
document.body.appendChild( NAV_BAR );

} // end

