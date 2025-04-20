const CSS_VARIABLES = getComputedStyle(document.documentElement);

const getCssVariable = (ident) => CSS_VARIABLES.getPropertyValue(ident);

const DATA = {
	projectsCards: [],
};
