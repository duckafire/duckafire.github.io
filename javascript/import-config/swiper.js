"use strict";
{ // start

const point = (dir, spa) => ({direction: (dir == "h") ? "horizontal" : "vertical", spaceBetween: spa});

new Swiper(".hi-projects-cards-swiper", {
	// TODO add lazy loading
	centeredSlides: true,
	preventClicks: true,
	preventClicksPropagation: true,
	allowTouchMove: false,

	slidesPerView: "auto",

	effect: "coverflow",
	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
	},

	navigation: {
		prevEl: "#custom-swiper-button-prev",
		nextEl: "#custom-swiper-button-next",
	},

	a11y: {
		prevSlideMessage: "Ir para o cartão anterior",
		nextSlideMessage: "Ir para o próximo cartão",
	},

	breakpoints: {
		0:    { ...point("h", 48) },
		480:  { ...point("h", 40) },
		600:  { ...point("v", 50) },
		801:  { ...point("v", 50) },
		1025: { ...point("h", 180) },
	},
});

} // end
