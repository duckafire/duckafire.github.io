{

class Group {
	#beforeSpan; #titleH1; #afterSpan; #marginProperty;

	get #classPrefix(){ return "category-title-" };

	constructor(htmlData){
		this.#beforeSpan = document.createElement("span");
		this.#titleH1    = document.createElement("h1");
		this.#afterSpan  = document.createElement("span");

		this.#beforeSpan.className = this.#classPrefix + "before";
		this.#titleH1.className    = this.#classPrefix + "title";
		this.#afterSpan.className  = this.#classPrefix + "after";

		this.#titleH1.textContent = htmlData.title;
		this.#marginProperty = "margin" + ((htmlData.hasMarginTop !== undefined) ? "Top" : "Bottom");
	}

	insetAllIn(dest){
		dest.style[this.#marginProperty] = getCssVariable("--main--projects-cards--padding");

		dest.appendChild(this.#beforeSpan);
		dest.appendChild(this.#titleH1);
		dest.appendChild(this.#afterSpan);
	}
}

document.querySelectorAll(".co-ta--category-title").forEach((unity) => {
	(new Group(unity.dataset)).insetAllIn(unity);
});

}
