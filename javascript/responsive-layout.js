{

const get_itself = (obj) => (typeof obj == "string") ? document.getElementById(obj) : obj;

class MoveTo {
	#itself; #destine;

	constructor(obj, mini, small, medium, big, huge, infinity){
		this.#itself = get_itself(obj);
		this.#destine = [
			document.getElementById(mini),
			document.getElementById(small),
			document.getElementById(medium),
			document.getElementById(big),
			document.getElementById(huge),
			document.getElementById(infinity),
		];
	}

	move_to(currentLayout){
		if(!this.#destine[ currentLayout ].contains( this.#itself ))
			this.#destine[ currentLayout ].appendChild( this.#itself );
	}
}

ResponsiveElements.once.push(new MoveTo(
	"hi-projects-cards",
	"co-hi-projects-cards",
	"co-hi-projects-cards",
	"co-hi-projects-cards-table-layout",
	"co-hi-projects-cards-table-layout",
	"co-hi-projects-cards",
	"co-hi-projects-cards",
));

}
