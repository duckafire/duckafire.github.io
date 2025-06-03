"use strict";
{ // start

const new_card = (title, description, cover_src, used_tech, highlight) => ({
	title,
	description,
	cover_src,
	used_tech,
	highlight
});

DATA_JSON.cards = []

/* TODO: dev code; it must be removed */
const get_num = (max, min) => Math.floor( Math.random() * max ) + min + 1;
const max = get_num(5, 5);

let usedTech, title = "foo";
let techMax, titleMax;


for(let i = 0; i < max; i++){
	usedTech = [];
	techMax = get_num(5, 1);
	
	for(let j = 0; j < techMax; j++)
		usedTech.push("*c-plain");

	titleMax = get_num(20, 1);

	for(let j = 0; j < titleMax; j++)
		title += "foo";

	DATA_JSON.cards.push(
		new_card(
			title + i,
			"Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti ultricies inceptos, quam facilisis aliquam vehicula quis. Laoreet proin magna inceptos senectus lorem. Penatibus etiam metus quam sodales nisi. Pellentesque mattis ligula habitasse sed eleifend massa hendrerit accumsan. Venenatis sed penatibus justo sagittis laoreet malesuada elementum. Auctor adipiscing conubia phasellus; aptent habitasse accumsan. Diam inceptos finibus magna imperdiet gravida molestie consequat himenaeos. Imperdiet suscipit natoque sem tellus ut; vel urna. Vulputate cubilia sodales risus at eget et sociosqu lacus commodo.",
			"https://cdn.jsdelivr.net/gh/duckafire/nest@work-in-progress/resources/images/foo.svg",
			usedTech,
			get_num(3, 0) == 1 ? { home_page: { "link": "#", "icon": "fa-brands fa-github" } } : null
		)
	);

	title = "foo";
}
/* TODO: dev code; it must be removed */

} // end
