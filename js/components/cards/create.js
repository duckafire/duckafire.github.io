"use strict";
{ // start

const normal_container = $("#cards-container");
const highlight_container = $("#highlight-cards-container");

for(const data of DATA_JSON.cards){
	normal_container.appendChild( BUILD_CARD.normal(data) );

	if(data.highlight != null)
		highlight_container.appendChild( BUILD_CARD.highlight(data) );
}

const highlight_card_width  = parseInt(getComputedStyle($(".highlight-card-title-container")).width);
const highlight_cards_title = $("@.highlight-card-title");
let px;

for(const title of highlight_cards_title){
	if(title.scrollWidth > highlight_card_width){
		title.style.paddingLeft = "1rem";
		px = title.scrollWidth + highlight_card_width;
		title.style.setProperty("--text-length", String(px) + "px");
	}else{
		title.style.animation = "none";
	}
}

} // end
