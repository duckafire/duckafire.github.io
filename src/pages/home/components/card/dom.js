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

document.querySelectorAll(".profile-card, .generic-card").forEach((card) =>
{
	// open/close a details container
	const BUTTON  = card.querySelector(".js\\:card-details-manager i[class^=fa-]");
	const DETAILS = card.querySelector(".card-details");

	BUTTON.addEventListener("click", () =>
	{
		if(DETAILS.open)
		{
			DETAILS.open = false;
			BUTTON.classList.add("fa-plus");
			BUTTON.classList.remove("fa-minus");
		}
		else
		{
			DETAILS.open = true;
			BUTTON.classList.add("fa-minus");
			BUTTON.classList.remove("fa-plus");
		}
	});

	// copy the content of the URLs from ".url-list-item";
	// define the URL of the anchor from ".url-list-item"
	card.querySelectorAll(".url-list-item").forEach(item =>
	{
		const BTN    = item.querySelectorAll(".url-list-btn");
		const URL    = BTN[0];
		const COPIER = BTN[1];
		const ANCHOR = BTN[2];

		COPIER.addEventListener("click", () =>
		{
			console.log("Why does not it have a clear and easy way to copy text to the user clipboards? >:(");
		});

		ANCHOR.href = URL.querySelector("input").value;
	});

	// if(card.classList.contains("profile-card")) {}
});
