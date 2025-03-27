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
