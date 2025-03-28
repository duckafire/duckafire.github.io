const JSON_URL = {
	knowTech: "https:raw.githubusercontent.com/duckafire/nest/refs/heads/work-in-progress/data-json/header/welcome-popup-know.json",
	projectsItems: [
		"https://raw.githubusercontent.com/duckafire/nest/refs/heads/work-in-progress/data-json/projects/highlight.json",
		"https://raw.githubusercontent.com/duckafire/nest/refs/heads/work-in-progress/data-json/projects/other.json",
	],
}

const RESET_ANIMATION = (element) => {
	// like magic
	element.style.animation = 'none';
	element.offsetHeight;
	element.style.animation = null;
}

const WIDTH = new class {
	get small(){  return 0};
	get medium(){ return 1};
	get big(){    return 2};

	check(){
		if(window.innerWidth < 800)
			return this.small;

		if(window.innerWidth < 1200)
			return this.medium;

		return this.big;
	}
};

const RESPONSIVE_ELEMENTS = [];
