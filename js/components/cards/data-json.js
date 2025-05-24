"use strict";
{ // start

const new_card = (title, description, cover_src, used_tech, highlight) => ({
	title,
	description,
	cover_src,
	used_tech,
	highlight
});

DATA_JSON.cards = [
	new_card(
		"foo0",
		"Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis. Laoreet proin magna inceptos senectus lorem. Penatibus etiam metus quam sodales nisi. Pellentesque mattis ligula habitasse sed eleifend massa hendrerit accumsan. Venenatis sed penatibus justo sagittis laoreet malesuada elementum. Auctor adipiscing conubia phasellus; aptent habitasse accumsan. Diam inceptos finibus magna imperdiet gravida molestie consequat himenaeos. Imperdiet suscipit natoque sem tellus ut; vel urna. Vulputate cubilia sodales risus at eget et sociosqu lacus commodo.",
		"https://cdn.jsdelivr.net/gh/duckafire/nest@work-in-progress/resources/images/foo.svg",
		["*c-plain", "*c-plain", "*c-plain", "*c-plain"],
		{
			home_page: { "link": "#", "icon": "fa-brands fa-github" }
		}
	),
	new_card(
		"foo1",
		"Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis. Laoreet proin magna inceptos senectus lorem. Penatibus etiam metus quam sodales nisi. Pellentesque mattis ligula habitasse sed eleifend massa hendrerit accumsan. Venenatis sed penatibus justo sagittis laoreet malesuada elementum. Auctor adipiscing conubia phasellus; aptent habitasse accumsan. Diam inceptos finibus magna imperdiet gravida molestie consequat himenaeos. Imperdiet suscipit natoque sem tellus ut; vel urna. Vulputate cubilia sodales risus at eget et sociosqu lacus commodo.",
		"https://cdn.jsdelivr.net/gh/duckafire/nest@work-in-progress/resources/images/foo.svg",
		["*c-plain", "*c-plain"],
		null
	),
	new_card(
		"foo2",
		"Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis. Laoreet proin magna inceptos senectus lorem. Penatibus etiam metus quam sodales nisi. Pellentesque mattis ligula habitasse sed eleifend massa hendrerit accumsan. Venenatis sed penatibus justo sagittis laoreet malesuada elementum. Auctor adipiscing conubia phasellus; aptent habitasse accumsan. Diam inceptos finibus magna imperdiet gravida molestie consequat himenaeos. Imperdiet suscipit natoque sem tellus ut; vel urna. Vulputate cubilia sodales risus at eget et sociosqu lacus commodo.",
		"https://cdn.jsdelivr.net/gh/duckafire/nest@work-in-progress/resources/images/foo.svg",
		["*c-plain"],
		{
			home_page: { "link": "#", "icon": "fa-brands fa-github" }
		}
	),
	new_card(
		"foo3",
		"Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis. Laoreet proin magna inceptos senectus lorem. Penatibus etiam metus quam sodales nisi. Pellentesque mattis ligula habitasse sed eleifend massa hendrerit accumsan. Venenatis sed penatibus justo sagittis laoreet malesuada elementum. Auctor adipiscing conubia phasellus; aptent habitasse accumsan. Diam inceptos finibus magna imperdiet gravida molestie consequat himenaeos. Imperdiet suscipit natoque sem tellus ut; vel urna. Vulputate cubilia sodales risus at eget et sociosqu lacus commodo.",
		"https://cdn.jsdelivr.net/gh/duckafire/nest@work-in-progress/resources/images/foo.svg",
		["*c-plain", "*c-plain", "*c-plain", "*c-plain", "*c-plain"],
		{
			home_page: { "link": "#", "icon": "fa-brands fa-github" }
		}
	),
	new_card(
		"foo4",
		"Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis. Laoreet proin magna inceptos senectus lorem. Penatibus etiam metus quam sodales nisi. Pellentesque mattis ligula habitasse sed eleifend massa hendrerit accumsan. Venenatis sed penatibus justo sagittis laoreet malesuada elementum. Auctor adipiscing conubia phasellus; aptent habitasse accumsan. Diam inceptos finibus magna imperdiet gravida molestie consequat himenaeos. Imperdiet suscipit natoque sem tellus ut; vel urna. Vulputate cubilia sodales risus at eget et sociosqu lacus commodo.",
		"https://cdn.jsdelivr.net/gh/duckafire/nest@work-in-progress/resources/images/foo.svg",
		["*c-plain", "*c-plain"],
		null
	)
];

} // end
