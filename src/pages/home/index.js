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

document.querySelectorAll(".card").forEach((card) =>
{
	const BUTTON  = card.querySelector(".details-manager-button");
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
});

document.querySelectorAll(".card-favoriter").forEach((button) =>
{
	button.addEventListener("click", () => {
		if(button.classList.contains("fa-solid"))
		{
			button.classList.add("fa-regular");
			button.classList.remove("fa-solid");
		}
		else
		{
			button.classList.add("fa-solid");
			button.classList.remove("fa-regular");
		}
	});
});
