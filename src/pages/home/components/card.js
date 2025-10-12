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

const JSON = {}

const create_content = () =>
{
	return section({className: "card-content"},

	section),
};

const CARDS_LIST = document.getElementById("cards-list");

JSON.forEach(data => {
	const CARD = li({className: "card"},
		section( null,
			figure( {className: "card-icon"},
				img({src: "", alt: "foo"}),
			figure),
			ul( {className: "clear-style card-options"},
				li(null, button({className: "ball-button details-manager-button fa-solid fa-plus"}, button), li),
				li(null, button({className: "ball-button card-favoriter fa-regular fa-star"}, button), li),
				li(null, button({className: "ball-button fa-solid fa-external-link"}, button), li),
			ul),
		section),

		details({className: "clear-style card-details"},
			summary(),
			div( null,
				ul( {className: "clear-style links-list"},
					li( {className: "links-list-item"},
						button( {className: "links-list-button"}),
							i( {className: "details-ball-button fa-solid fa-folder", i),
							span( {className: "links-list-description"},
								"foo",
							span),
						button),
					li),
				ul),
				div( {className: "card-details-related"},
					h1( {className: "card-details-title"}, "Related", h1),
					ul( {className: "clear-style links-list"},
						li( {className: "links-list-item"},
							button( {className: "links-list-button"},
								span( {className: "links-list-description"},
									"http",
								span),
							button),
							button( null,
								i( {className: "links-list-url-copier fa-solid fa-copy"}, i),
							button),
						li),
					ul),
				div),
			div),
		details),
	li);

	CARDS_LIST.appendChild(CARD);
});

} // end
