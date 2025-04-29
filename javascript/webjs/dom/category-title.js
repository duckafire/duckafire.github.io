"use strict";
{ // start

class Group {
	#beforeSpan; #titleH1; #afterSpan; #marginProperty;

	#getClassPrefix(){ return "category-title-" };

	constructor(htmlData){
		this.#beforeSpan = document.createElement("span");
		this.#titleH1    = document.createElement("h1");
		this.#afterSpan  = document.createElement("span");

		this.#beforeSpan.className = this.#getClassPrefix() + "before";
		this.#titleH1.className    = this.#getClassPrefix() + "title";
		this.#afterSpan.className  = this.#getClassPrefix() + "after";

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
