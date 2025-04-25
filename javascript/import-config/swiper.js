"use strict";
{ // start

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
		0: {
			spaceBetween: 48,
			direction: "horizontal",
		},
		480: {
			direction: "horizontal",
			spaceBetween: 40,
		},
		600: {
			direction: "vertical",
			spaceBetween: 50,
		},
	},
});

} // end
