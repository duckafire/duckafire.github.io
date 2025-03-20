{

const CUR_PLACE = {small: 0, medium: 1, big: 2};

const WIDTH = {
	isSmall(){  return (window.innerWidth < 800); },
	isMedium(){ return (window.innerWidth > 799 && window.innerWidth < 1200); },
	isBig(){    return (window.innerWidth > 1199); }
};

class MoveElement {
	constructor(commonPath, itId, smallId, mediumId, bigId){
		this.itself        = document.querySelector(commonPath + ">" + itId);
		this.smallDestine  = document.querySelector(commonPath + ">" + smallId);
		this.mediumDestine = document.querySelector(commonPath + ">" + mediumId);
		this.bigDestine    = null;
	}

	move(dest){
		if(dest == CUR_PLACE.small)
			this.smallDestine.appendChild( this.itself );

		else if(dest == CUR_PLACE.medium)
			this.mediumDestine.appendChild( this.itself );

		else
			this.bigDestine.appendChild( this.itself );
	}
};

const ELEM = {
	openHeaderPopup: document.querySelector("section#header > section#presentation > div#header > div#open-popup > i"),
	headerDescription: new MoveElement(
		"section#header > section#presentation",
		"div#description > p",
		"div#description",
		"div#header > div#title-links > div",
		null,
	),
	headerLinksIcons: [],
};

for(let i = 1; i < 4; i++){
	ELEM.headerLinksIcons.push(
		new MoveElement(
			"section#header > section#presentation > div#header",
			`div#title-links > div > a:nth-child(${i})`,
			"div#title-links > div",
			"div#open-popup",
			null
		)
	);
}

function updateOpenHeaderPopupButton(){
	if(WIDTH.isSmall() && ELEM.openHeaderPopup.classList.contains("fa-circle-info")){
		ELEM.openHeaderPopup.classList.remove("fa-circle-info");
		ELEM.openHeaderPopup.classList.add("fa-ellipsis-vertical");

		ELEM.headerDescription.move(CUR_PLACE.small);

		for(let i = 0; i < 3; i++)
			ELEM.headerLinksIcons[i].move(CUR_PLACE.small);

	}else if(WIDTH.isMedium() && ELEM.openHeaderPopup.classList.contains("fa-ellipsis-vertical")){
		ELEM.openHeaderPopup.classList.remove("fa-ellipsis-vertical");
		ELEM.openHeaderPopup.classList.add("fa-circle-info");

		ELEM.headerDescription.move(CUR_PLACE.medium);

		for(let i = 0; i < 3; i++)
			ELEM.headerLinksIcons[i].move(CUR_PLACE.medium);
	}
}

window.addEventListener("DOMContentLoaded", updateOpenHeaderPopupButton());
window.addEventListener("resize", updateOpenHeaderPopupButton());

}
