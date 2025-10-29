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

const createUrlList = (json) =>
{
	const cssRules = {
		"--fg": "var(--c-card-details-btn-fg)",
		"--bg": "var(--c-card-details-btn-bg)",
	};

	const LIST = UL( {className: "clear-style url-list", cssRules}, UL);
	let item;

	for(const DATA of json["url-list"]["related"])
	{
		LIST.appendChild(
			LI( {className: "url-list-item", title: DATA["title"]},
				INPUT( {className: "url-list-btn rounded-rect-btn url-list-text live-input", role: "button", value: "https://"+DATA["url"], type: "text", readOnly: "~", translate: false}),
				BUTTON( {className: "url-list-btn rounded-rect-btn live-btn unflex", style: "--scalew:2"},
					I( {className: "fa-solid fa-copy"}, I),
				BUTTON),
				A( {role: "button", className: "clear-style url-list-btn rounded-rect-btn live-btn unflex", href: "https://"+DATA["url"], style: "--scalew:2", rel: "noopener noreferrer"},
					I( {className: "fa-solid fa-external-link"}, I),
				A),
			LI)
		);
	}

	return LIST;
}

const createCardDetails = (json) =>
DIV( {className: "card-division", role: "details", style: "display:none"},
	DIV( {className: "card-details"},
		SUMMARY( null, SUMMARY),
		createUrlList(json),
	DIV),
DIV);

const setCssVariable = (cssRules, json, ...strings) =>
{
	let field = "--c-card";
	let value = json["colors"];

	for(const STR of strings)
	{
		field += "-" + STR;
		value = value[STR];
	}

	cssRules[field] = "#" + value;
}

const declareCardColorVariables = (json) =>
{
	const colors = {};

	for(const DIVISION in json["colors"])
	{
		for(const STUFF in json["colors"][DIVISION])
		{
			switch(STUFF){
				case "bg":
					setCssVariable(colors, json, DIVISION, STUFF);
					break;

				// it is an object with
				// multiple colors (fg;bg)
				default:
					for(const COLOR in json["colors"][DIVISION][STUFF])
						setCssVariable(colors, json, DIVISION, STUFF, COLOR);
			}
		}
	}

	return colors;
}

const __cardContentCssRules__ = {
	"--fg": "var(--c-card-front-btn-fg)",
	"--bg": "var(--c-card-front-btn-bg)",
	color: "var(--fg)",
};

const createCardContent = (json) =>
json["type"] == "profile"
?
[
	IMG( {className: "card-cover", src: json["img-cover"]["src"], alt: json["img-cover"]["alt"]}),
	DIV( {className: "card-options", cssRules: __cardContentCssRules__},
		H1( {translate: false}, json["title"], H1),
		BUTTON( {className: "js:card-details-manager oval-btn live-btn", cssRules: {fontSize: "1.25rem"}},
			I( {className: "fa-solid fa-plus"}, I),
		BUTTON),
	DIV),
]
:
[
	DIV( {className: "card-cover", cssRules: {color: "var(--c-card-front-btn-fg)"}},
		I( {className: json["class-icon"]}, I),
	DIV),
	DIV( {className: "card-options", cssRules: __cardContentCssRules__},
		BUTTON( {className: "js:card-details-manager ball-btn live-btn"},
			I( {className: "fa-solid fa-plus"}, I),
		BUTTON),
		A( {role: "button", className: "ball-btn live-btn", href: "https://"+json["url-list"]["main-url"], rel: "noopener noreferrer"},
			I( {className: "fa-solid fa-external-link"}, I),
		A),
	DIV),
];

const createCard = (json) =>
LI( {className: json["type"] + "-card", cssRules = declareCardColorVariables(json)},
	DIV( {className: "card-division"},
		SECTION( {className: "card-content"},
			...createCardContent(json),
		SECTION),
	DIV),
	createCardDetails(json),
LI);

const createCardsBasedJson = async (attempt, url) =>
{
	attempt++;

fetch(url)
	.then(response =>
	{
		if(!response.ok)
			throw new InternalError(`Network response was not OK. Attempt #${attempt}.`);

		return response.json();
	})
	.then(json =>
	{
		const CARDS_LIST = document.getElementById("cards-list");
		for(const DATA of json)
			CARDS_LIST.appendChild( createCard(DATA) );

		document.querySelectorAll(".profile-card, .website-card").forEach((card) =>
		{
			// open/close a details container
			const BUTTON  = card.querySelector(".js\\:card-details-manager");
			const B_ICON  = BUTTON.querySelector("[class^=fa-]");
			const DETAILS = card.querySelector('.card-division[role="details"]');

			BUTTON.addEventListener("click", () =>
			{
				if(DETAILS.style.display == "")
				{
					DETAILS.style.display = "none";
					B_ICON.classList.add("fa-plus");
					B_ICON.classList.remove("fa-minus");
				}
				else
				{
					DETAILS.style.display = "";
					B_ICON.classList.add("fa-minus");
					B_ICON.classList.remove("fa-plus");
				}
			});

			// copy the content of the URLs from ".url-list-item";
			// define the URL of the anchor from ".url-list-item"
			card.querySelectorAll(".url-list-item").forEach(item =>
			{
				const BTN    = item.querySelectorAll(".url-list-btn");
				const URL    = BTN[0];
				const COPIER = BTN[1];

				COPIER.addEventListener("click", () =>
				{
					copyTextFromInputToClipboard(URL);
				});
			});

			// if(card.classList.contains("profile-card")) {}
		});
	})
	.catch(err =>
	{
		if(attempt >= 5)
		{
			console.error(new InternalError(`Stopping, to try to create the cards, after #${attempt} attempts.`));
			return;
		}

		console.error(err);
		setTimeout(() => createCardsBasedJson(attempt), 1000);
	});
};
