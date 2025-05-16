{

const get_itself = (obj) => (typeof obj == "string") ? document.getElementById(obj) : obj;

class MoveTo {
	#itself; #destine;

	constructor(obj, elemList){
		this.#itself = get_itself(obj);
		this.#destine = []

		if(elemList.length != 3){
			alert(
				'Invalid quantity!\n' +
				'"responsive-layout.js": `MoveTo` (constructor)\n' +
				'Element:\n' +
				this.#itself.outerHTML.match(/<[^>]+>/)[0]
			);
		}

		for(const id of elemList)
			this.#destine.push( document.getElementById(id) );
	}

	move_to(currentLayout){
		if(!this.#destine[ currentLayout ].contains( this.#itself ))
			this.#destine[ currentLayout ].appendChild( this.#itself );
	}
}

}
