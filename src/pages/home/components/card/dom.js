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

class CardURLCacheRelatedItem
{
	constructor(rootUrl, data, classIconFallback)
	{
		this.title       = data["title"];
		this.description = data["description"];
		this.classIcon   = data["class-icon"] || classIconFallback;
		this.urlSource   = null; // it will be catched

		this.rootUrl  = rootUrl;
		this.itemData = data["list"];

		this.url = {};

		for(const FIELD in this.itemData)
			this.url[ FIELD ] = this.#buildUrl( FIELD );

		delete this.rootUrl;
		delete this.itemData;
	}

	#buildUrl(field)
	{
		const DATA = this.itemData[field];

		if(DATA["url"] !== undefined)
			return "https://" + DATA["url"];

		if(DATA["endpoint"] !== undefined)
			return `${this.rootUrl}/${DATA["endpoint"]}`;

		throw new InternalError("Invalid field.");
	}
}

class CardURLCache
{
	// temporary (only during
	// the cathing of cache
	static #rootUrl;
	static #mainUrl;
	static #cardId = -1; // yes, I could have used `storage.length - 1`
	static #cardUrlId;

	static #storage = [];

	static catchThem(json)
	{
		CardURLCache.#cardId++; // synchronized
		CardURLCache.#storage.push( [] );

		if(json["type"] === "website")
			CardURLCache.#buildMain( json["url-list"]["main"] );

		CardURLCache.#cardUrlId = 0; // reseted every time
		CardURLCache.#buildRelatedItems( json["url-list"]["related"], json["class-icon"] );
	}

	static getItem(cardId, cardUrlId)
	{
		return CardURLCache.#storage[ cardId ][ cardUrlId ];
	}

	static mainUrl()
	{
		return CardURLCache.#mainUrl;
	}

	static title(field)
	{
		return CardURLCache.#storagePull(true).title;
	}

	static nextCardUrl()
	{
		CardURLCache.#cardUrlId++;
	}

	static relatedUrl(field)
	{
		return CardURLCache.#storagePull(true).url[field];
	}

	static htmlCacheAttr()
	{
		// destroy it (with `...`)
		// after to get it
		return {
			// for dataset
			"card-cache-id":     CardURLCache.#cardId,
			"card-cache-url-id": CardURLCache.#cardUrlId,
		};
	}

	static catchCacheItemUrlSource(inputElem)
	{
		const item  = CardURLCache.#storage[ CardURLCache.#cardId ][ CardURLCache.#cardUrlId ];

		if(item.urlSource === null)
			item.urlSource = inputElem;

		return inputElem;
	}

	static #storagePull(requireItem)
	{
		const LAST = CardURLCache.#storage[ CardURLCache.#cardId ];

		if(requireItem)
			return LAST[ CardURLCache.#cardUrlId ];

		// require items list
		return LAST;
	}

	static #buildMain(main)
	{
		let url = "https://" + main["url"];
		CardURLCache.#rootUrl = url;

		if(main["endpoint"] !== undefined)
			url += "/" + main["endpoint"];

		CardURLCache.#mainUrl = url;
	}

	static #buildRelatedItems(list, classIconFallback)
	{
		// `classIconFallback` is `undefined` is
		// `json["type"] === "profile"`
		for(const DATA of list)
		{
			CardURLCache.#storagePull().push(
				new CardURLCacheRelatedItem( CardURLCache.#rootUrl, DATA, classIconFallback)
			);
		}
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
		{
			LIST.appendChild(
				CardURLList.#listItem(
					json,
					DATA,
					CardURLCache.title(),
					CardURLCache.relatedUrl("home"),
				)
			);

			CardURLCache.nextCardUrl();
		}

		return LIST;
	}

	static #listItem(json, data, title, url)
	{
		return LI( {className: "url-list-item", title, style: "--scalew:2"},
			CardURLCache.catchCacheItemUrlSource(
				INPUT( {className: "url-list-btn rounded-rect-btn url-list-text live-input", role: "button", value: url, type: "text", readOnly: "~", translate: false, dataSets: {"card-url-btn-type": "url-source"}})
			),
			CardInfoPopup.applyOpenEvent(
				BUTTON( {className: "url-list-btn rounded-rect-btn live-btn unflex"},
					//   Cache attributes are putted in the icon, instead
					// the button, because `event.target` (used as a
					// reference to the clicked object, in the button
					// Event Listener) can point to the button or to the
					// button icon, because it point the CLICKED element
					// (yes, children can throw pattern events).
					//   So, it is not possible to get the attributes
					// values, if they are in the button, when the button
					// icon is clicked.
					//   It is possible to access the icon attribute, if
					// button is clicked, using `children` (array),
					// `querySelector` (function), or other suchlike.
					I( {className: "fa-solid fa-circle-info", dataSets: {...CardURLCache.htmlCacheAttr()}}, I),
				BUTTON)
			),
			BUTTON( {className: "url-list-btn rounded-rect-btn live-btn unflex", dataSets: {"card-url-btn-type": "url-copier"}},
				I( {className: "fa-solid fa-copy"}, I),
			BUTTON),
			A( {role: "button", className: "clear-style url-list-btn rounded-rect-btn live-btn unflex", href: url},
				I( {className: "fa-solid fa-external-link"}, I),
			A),
		LI);
	}
}

class CardEventListeners
{
	static #cardBuf;

	static applyIn(card)
	{
		CardEventListeners.#cardBuf = card;

		CardEventListeners.#copyHomeUrl();
		CardEventListeners.#toggleDetailsState();
	}

	static #copyHomeUrl()
	{
		CardEventListeners.#cardBuf.querySelectorAll(".url-list-item").forEach(item =>
		{
			const URL_SOURCE = item.querySelector("[data-card-url-btn-type=url-source]");
			const BTN_COPIER = item.querySelector("[data-card-url-btn-type=url-copier]");

			BTN_COPIER.addEventListener("click", () =>
			{
				copyTextFromInputToClipboard(URL);
			});
		});
	}

	static #toggleDetailsState()
	{
		// CONTainer
		const MANAGER_BTN  = CardEventListeners.#cardBuf.querySelector("[data-card-details-manager=true]");
		const DETAILS_CONT = CardEventListeners.#cardBuf.querySelector(".card-division[role=details]");

		const MANAGER_ICON = MANAGER_BTN.querySelector("[class^=fa-]");

		MANAGER_BTN.addEventListener("click", () =>
		{
			if(DETAILS_CONT.style.display == "")
			{
				DETAILS_CONT.style.display = "none";
				MANAGER_BTN.classList.add("fa-plus");
				MANAGER_BTN.classList.remove("fa-minus");
				return;
			}

			DETAILS_CONT.style.display = "";
			MANAGER_ICON.classList.add("fa-minus");
			MANAGER_ICON.classList.remove("fa-plus");
		});
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
		CardURLCache.catchThem(json);

		const CARD =
		LI( {className: json["type"] + "-card", cssRules: CardColors.build(json)},
			DIV( {className: "card-division"},
				SECTION( {className: "card-content"},
					...(Card.#content(json)),
				SECTION),
			DIV),
			Card.#details(json),
		LI);

		CardEventListeners.applyIn( CARD );
		return CARD;
	}

	static #content(json)
	{
		// for the "details manager button"
		const dataSets = {"card-details-manager": "true"};

		if(json["type"] == "profile")
			return [
				IMG( {className: "card-cover", src: json["img-cover"]["src"], alt: json["img-cover"]["alt"]}),
				DIV( {className: "card-options", cssRules: Card.#contentCssRules},
					H1( {translate: false}, json["title"], H1),
					BUTTON( {className: "oval-btn live-btn", cssRules: {fontSize: "1.25rem"}, dataSets},
						I( {className: "fa-solid fa-plus"}, I),
					BUTTON),
				DIV),
			];

		return [
			DIV( {className: "card-cover", cssRules: {color: "var(--c-card-front-btn-fg)"}},
				I( {className: json["class-icon"]}, I),
			DIV),
			DIV( {className: "card-options", cssRules: Card.#contentCssRules},
				BUTTON( {className: "ball-btn live-btn", dataSets},
					I( {className: "fa-solid fa-plus"}, I),
				BUTTON),
				A( {role: "button", className: "ball-btn live-btn", href: CardURLCache.mainUrl()},
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

class CardInfoPopup
{
	static #component;

	static #classIcon;
	static #title;
	static #description;

	static #btn = {
		wiki: null,
		license: null,
		copier: null,
		home: null,
	};

	static #urlSource = null;

	static #lastCardId = null;
	static #lastCardUrlId = null;

	static place()
	{
		const TOGGLE_STATE_BTN =
		BUTTON( {className: "cards-info-close-btn"},
			I( {className: "fa-solid fa-xmark"}, I),
		BUTTON);

		CardInfoPopup.#component =
		DIV( {className: "cards-info-container", cssRules: {display: "none"}},
			DIV( {className: "cards-info"},
				DIV( {className: "cards-info-close-btn-container"},
					TOGGLE_STATE_BTN,
				DIV),
				DIV( {className: "cards-info-head"},
					CardInfoPopup.#placeClassIcon(),
					CardInfoPopup.#placeTitle(),
				DIV),
				UL( {className: "clear-style cards-info-url-list"},
					CardInfoPopup.#placeOption("book",          "wiki",    "Wiki",       true),
					CardInfoPopup.#placeOption("newspaper",     "license", "License",    true),
					CardInfoPopup.#placeOption("copy",          "copier",  "Copy URL"        ),
					CardInfoPopup.#placeOption("external-link", "home",    "Visit home", true),
				UL),
				DIV( {className: "cards-info-description"},
					CardInfoPopup.#placeDescription(),
				DIV),
			DIV),
		DIV);

		CardInfoPopup.#applyToggleStateEv( TOGGLE_STATE_BTN );
		document.body.appendChild( CardInfoPopup.#component );
	}

	static updateContent(btn)
	{
		// Cache properties are in the icon because
		// `event.target` is a reference to the clicked
		// element, that it can be the button or its
		// icon.
		if(btn instanceof HTMLButtonElement)
			btn = btn.children[0]; // it has only one child, its icon

		const CARD_ID     = parseInt(btn.dataset.cardCacheId,    10);
		const CARD_URL_ID = parseInt(btn.dataset.cardCacheUrlId, 10);

		if(CARD_ID === CardInfoPopup.#lastCardId && CARD_URL_ID === CardInfoPopup.#lastCardUrlId)
			return;

		CardInfoPopup.#lastCardId    = CARD_ID;
		CardInfoPopup.#lastCardUrlId = CARD_URL_ID;

		const ITEM_CACHE = CardURLCache.getItem( CARD_ID, CARD_URL_ID );

		CardInfoPopup.#title.textContent       = ITEM_CACHE.title;
		CardInfoPopup.#classIcon.className     = ITEM_CACHE.classIcon;
		CardInfoPopup.#description.textContent = ITEM_CACHE.description;

		CardInfoPopup.#urlSource = ITEM_CACHE.urlSource;

		let jump = false;
		const usedBtns = [];

		// "copier" never will be hidden
		for(const TAG in ITEM_CACHE.url)
		{
			usedBtns.push( TAG );
			CardInfoPopup.#btn[ TAG ].children[0].href = ITEM_CACHE.url[ TAG ];
		}

		// hide buttons that
		// do not have a url
		for(const TAG in CardInfoPopup.#btn)
		{
			if(TAG === "copier")
				return;

			CardInfoPopup.#btn[ TAG ].style.display = "";

			for(const SAVED of usedBtns)
			{
				if(TAG === SAVED)
				{
					jump = true;
					break;
				}
			}

			if(jump)
			{
				jump = false;
				continue;
			}

			CardInfoPopup.#btn[ TAG ].style.display = "none";
		}
	}

	static getUrlSource()
	{
		return CardInfoPopup.#urlSource;
	}

	static getComponent()
	{
		return CardInfoPopup.#component;
	}

	static applyOpenEvent(btn)
	{
		// only one function to all elements,
		// instead one different function
		// (with the same content) to each
		btn.addEventListener("click", CardInfoPopup.openEvent);
		return btn;
	}

	static openEvent(ev)
	{
		CardInfoPopup.getComponent().style.display = "";
		document.body.style.overflow = "hidden";
		CardInfoPopup.updateContent(ev.target);
	}

	static #placeClassIcon(){
		return (CardInfoPopup.#classIcon = I());
	}

	static #placeTitle()
	{
		return (CardInfoPopup.#title = H1());
	}

	static #placeDescription()
	{
		return (CardInfoPopup.#description = P());
	}

	static #placeOption(classIcon, btnTag, btnTitle, isAnchor)
	{
		// <li>
		//   <btn>
		//     <i></i>
		//     Button title
		//   </btn>
		// </li>
		let btn = (isAnchor) ? A( {role: "button"}, A) : BUTTON();

		CardInfoPopup.#applyUrlCopierEv( btn, btnTag );


		btn.appendChild( I( {className: "fa-solid fa-" + classIcon}, I) );
		btn = LI( {title: btnTitle}, btn, LI);

		return (CardInfoPopup.#btn[ btnTag ] = btn);
	}

	static #applyToggleStateEv(btn)
	{
		btn.addEventListener("click", () =>
		{
			CardInfoPopup.getComponent().style.display = "none";
			document.body.style.overflow = "";
		});
	}

	static #applyUrlCopierEv(btn, btnTag)
	{
		if(btnTag !== "copier")
			return;

		btn.addEventListener("click", () =>
		{
			const URL_SOURCE = CardInfoPopup.getUrlSource();

			if(URL_SOURCE === null)
				throw new InternalError("URL Source not catched.");

			copyTextFromInputToClipboard( URL_SOURCE );
		});
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

		CardInfoPopup.place();
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
