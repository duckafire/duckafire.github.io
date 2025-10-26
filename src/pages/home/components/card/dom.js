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
	const LIST = UL( {className: "clear-style url-list"}, UL);
	let item;

	for(const DATA of json["url-list"]["related"])
	{
		LIST.appendChild(
			LI( {className: "url-list-item", title: DATA["title"]},
				BUTTON( {className: "url-list-btn rounded-rect-btn url-list-text"},
					INPUT( {value: "https://"+DATA["url"], type: "text", readOnly: "readOnly", translate: "off"}),
				BUTTON),
				BUTTON( {className: "url-list-btn rounded-rect-btn", style: "--scalew:2"},
					I( {className: "fa-solid fa-copy"}, I),
				BUTTON),
				A( {role: "button", className: "clear-style url-list-btn rounded-rect-btn", href: "https://"+DATA["url"], style: "--scalew:2", rel: "noopener noreferrer"},
					I( {className: "fa-solid fa-external-link"}, I),
				A),
			LI)
		);
	}

	return LIST;
}

const createCardDetails = (json) =>
DIV( {className: "card-division", role: "details", style: "display:none"},
	(json["type"] == "main" ? MAIN : DIV)( {className: "card-details"},
		SUMMARY( null, SUMMARY),
		createUrlList(json),
	(json["type"] == "main" ? MAIN : DIV)),
DIV);

const createMainCard = (json) =>
LI( {className: "profile-card"},
	DIV( {className: "card-division"},
		SECTION( {className: "card-content"},
			IMG( {className: "card-cover", src: json["img-cover"]["src"], alt: json["img-cover"]["alt"]}),
			DIV( {className: "card-options"},
				H1( {translate: "off"}, json["title"], H1),
				BUTTON( {className: "js:card-details-manager oval-btn", style: "font-size:1.25rem;--bg-color:var(--SOFT_SILVER)"},
					I( {className: "fa-solid fa-plus"}, I),
				BUTTON),
			DIV),
		SECTION),
	DIV),
	createCardDetails(json),
LI);

const createGenericCard = (json) =>
LI( {className: "generic-card"},
	DIV( {className: "card-division"},
		SECTION( {className: "card-content"},
			DIV( {className: "card-cover"},
				I( {className: json["fa-icon"]}, I),
			DIV),
			DIV( {className: "card-options", style: "--bg-color:var(--SOFT_SILVER)"},
				BUTTON( {className: "js:card-details-manager ball-btn"},
					I( {className: "fa-solid fa-plus"}, I),
				BUTTON),
				A( {role: "button", className: "ball-btn", href: "https://"+json["url-list"]["main-url"], rel: "noopener noreferrer"},
					I( {className: "fa-solid fa-external-link"}, I),
				A),
			DIV),
		SECTION),
	DIV),
	createCardDetails(json),
LI);

const createCardsBasedJson = async (attempt) =>
{
	attempt++;

fetch("./components/card/data.json")
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
			CARDS_LIST.appendChild( (DATA.type == "main" ? createMainCard : createGenericCard)(DATA) );

		document.querySelectorAll(".profile-card, .generic-card").forEach((card) =>
		{
			// open/close a details container
			const BUTTON  = card.querySelector(".js\\:card-details-manager");
			const DETAILS = card.querySelector('.card-division[role="details"]');

			BUTTON.addEventListener("click", () =>
			{
				if(DETAILS.style.display == "")
				{
					DETAILS.style.display = "none";
					BUTTON.classList.add("fa-plus");
					BUTTON.classList.remove("fa-minus");
				}
				else
				{
					DETAILS.style.display = "";
					BUTTON.classList.add("fa-minus");
					BUTTON.classList.remove("fa-plus");
				}
			});

			// copy the content of the URLs from ".url-list-item";
			// define the URL of the anchor from ".url-list-item"
			card.querySelectorAll(".url-list-item").forEach(item =>
			{
				const BTN    = item.querySelectorAll(".url-list-btn");
				const URL    = BTN[0].children[0];
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
			console.error(new InternalError(`Stopping, to try to create the cards, after #${attempts} attempts.`));
			return;
		}

		console.error(err);
		setTimeout(() => createCardsBasedJson(attempt), 1000);
	});
};

createCardsBasedJson(0);
