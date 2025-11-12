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

const createPageFooterList = (json) =>
{
	const LIST = UL( {className: "footer-list"}, UL);
	let elem;

	for(const ITEM of json)
	{
		switch(ITEM["type"])
		{
			case "title":
				elem =
				LI( {className: "footer-list-title"},
					...(ITEM["class-icon"] === undefined
						? [ITEM["title"]]
						: [
							I( {className: ITEM["class-icon"]}, I),
							SPAN( null, ITEM["title"], SPAN),
						]
					),
				LI);
				break;

			case "item":
				elem =
				LI( null,
					A( {className: "footer-url", href: "https://"+ITEM["url"]},
						// TODO: title property to no-mobile
						I( {className: ITEM["class-icon"]}, I),
						SPAN( null, ITEM["title"], SPAN),
					A),
				LI);
				break;

			case "sublist":
				elem = createPageFooterList(ITEM["items"]);
				break;
		}

		LIST.appendChild(elem);
	}

	return LIST;
}

const createPageFooter = async (attempt, url) =>
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
		const PAGE_FOOTER = document.querySelector(".page-footer");

		for(const GROUP of json)
			PAGE_FOOTER.appendChild( createPageFooterList( GROUP ) );
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
