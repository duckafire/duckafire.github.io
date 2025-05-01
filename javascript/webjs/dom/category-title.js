"use strict";
{ // start

class Group {
	#beforeSpan; #titleH1; #afterSpan; #marginProperty;

	#getLineClass(specific, isTitle){
		const chunk = "category-title-";
		const toAll = chunk + specific;

		if(isTitle)
			return toAll;

		return toAll + " " + chunk + "line";
	}

	constructor(htmlData){
		this.#beforeSpan = document.createElement("span");
		this.#titleH1    = document.createElement("h1");
		this.#afterSpan  = document.createElement("span");

		this.#beforeSpan.className = this.#getLineClass("before");
		this.#titleH1.className    = this.#getLineClass("title", true);
		this.#afterSpan.className  = this.#getLineClass("after");

		this.#titleH1.textContent = htmlData.title;
		this.#marginProperty = "margin" + ((htmlData.hasMarginTop !== undefined) ? "Top" : "Bottom");
	}

	insert_all_in(dest){
		dest.style[this.#marginProperty] = get_css_variable("main .projects-cards", "--projects-cards-padding");

		dest.appendChild(this.#beforeSpan);
		dest.appendChild(this.#titleH1);
		dest.appendChild(this.#afterSpan);
	}
}

document.querySelectorAll(".co-gr-category-title").forEach((unity) => {
	(new Group(unity.dataset)).insert_all_in(unity);
});

} // end
