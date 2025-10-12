"use strict";
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
