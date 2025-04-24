"use strict";
const get_css_variable = (query, variable) => {
	return getComputedStyle(document.querySelector(query)).getPropertyValue(variable);
}

const Data = {
	projectsCards: [],
};
