"use strict";
{ // start

const normal = document.getElementById("cards-container");
const highlight = document.getElementById("highlight-cards-container");

for(const data of DATA_JSON.cards){
	normal.appendChild( BUILD_CARD.normal(data) );

	if(data.highlight != null)
		highlight.appendChild( BUILD_CARD.highlight(data) );
}

} // end
