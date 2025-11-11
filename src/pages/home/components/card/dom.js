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

class FormatCardURL
{
	static main(json)
	{
		json = json["url-list"];
		const FIRST = `https://${json["root-url"]}`;

		if(json["main-url"] === null)
			return FIRST;

		return `${FIRST}/${json["main-url"]}`;
	}

	static related(json, data)
	{
		if(json["type"] == "profile")
			return `https://${data["url"]}`;

		return `https://${json["url-list"]["root-url"]}/${data["url"]}`;
	}
}

class CardColors
{
	static build(json)
	{
		const rules = {}

		for(const DIVISION in json["colors"])
			for(const STUFF in json["colors"][DIVISION])
				CardColors.#extractFields(rules, json, DIVISION, STUFF);

		return rules;
	}

	static #extractFields(rules, json, div, stuff)
	{
		switch(stuff){
			case "bg":
				CardColors.#declareVariable(rules, json, div, stuff);
				break;

			// it is an object with
			// multiple colors (fg;bg)
			default:
				for(const COLOR in json["colors"][div][stuff])
					CardColors.#declareVariable(rules, json, div, stuff, COLOR);
		}
	}

	static #declareVariable(rules, json, ...strings)
	{
		let field = "--c-card";
		let value = json["colors"];

		for(const STR of strings)
		{
			field += "-" + STR;
			value = value[STR];
		}

		rules[field] = "#" + value;
	}
}

class CardURLList
{
	static build(json)
	{
		const LIST = UL( {className: "clear-style url-list", cssRules: {"--fg": "var(--c-card-details-btn-fg)", "--bg": "var(--c-card-details-btn-bg)"}}, UL);

		for(const DATA of json["url-list"]["related"])
			LIST.appendChild( CardURLList.#listItem(json, DATA) );

		return LIST;
	}

	static #listItem(json, data)
	{
		const FULL_URL = FormatCardURL.related(json, data);

		return LI( {className: "url-list-item", title: data["title"], style: "--scalew:2"},
			INPUT( {className: "url-list-btn rounded-rect-btn url-list-text live-input", role: "button", value: FULL_URL, type: "text", readOnly: "~", translate: false}),
			BUTTON( {className: "url-list-btn rounded-rect-btn live-btn unflex"},
				I( {className: "fa-solid fa-copy"}, I),
			BUTTON),
			A( {role: "button", className: "clear-style url-list-btn rounded-rect-btn live-btn unflex", href: FULL_URL},
				I( {className: "fa-solid fa-external-link"}, I),
			A),
		LI);
	}
}

class Card
{
	static #contentCssRules = {
		"--fg":  "var(--c-card-front-btn-fg)",
		"--bg":  "var(--c-card-front-btn-bg)",
		"color": "var(--fg)",
	};

	static build(json)
	{
		return LI( {className: json["type"] + "-card", cssRules: CardColors.build(json)},
			DIV( {className: "card-division"},
				SECTION( {className: "card-content"},
					...(Card.#content(json)),
				SECTION),
			DIV),
			Card.#details(json),
		LI);
	}

	static #content(json)
	{
		if(json["type"] == "profile")
			return [
				IMG( {className: "card-cover", src: json["img-cover"]["src"], alt: json["img-cover"]["alt"]}),
				DIV( {className: "card-options", cssRules: Card.#contentCssRules},
					H1( {translate: false}, json["title"], H1),
					BUTTON( {className: "js:card-details-manager oval-btn live-btn", cssRules: {fontSize: "1.25rem"}},
						I( {className: "fa-solid fa-plus"}, I),
					BUTTON),
				DIV),
			];

		return [
			DIV( {className: "card-cover", cssRules: {color: "var(--c-card-front-btn-fg)"}},
				I( {className: json["class-icon"]}, I),
			DIV),
			DIV( {className: "card-options", cssRules: Card.#contentCssRules},
				BUTTON( {className: "js:card-details-manager ball-btn live-btn"},
					I( {className: "fa-solid fa-plus"}, I),
				BUTTON),
				A( {role: "button", className: "ball-btn live-btn", href: FormatCardURL.main(json)},
					I( {className: "fa-solid fa-external-link"}, I),
				A),
			DIV),
		];
	}

	static #details(json)
	{
		return DIV( {className: "card-division", role: "details", style: "display:none"},
			DIV( {className: "card-details"},
				SUMMARY( null, SUMMARY),
				CardURLList.build(json),
			DIV),
		DIV);
	}
}

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
			CARDS_LIST.appendChild( Card.build(DATA) );

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
