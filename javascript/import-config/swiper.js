"use strict";
{ // start

new Swiper(".hi-projects-cards-swiper", {
	// TODO add lazy loading
	centeredSlides: true,
	preventClicks: true,
	preventClicksPropagation: true,
	allowTouchMove: false,

	navigation: {
		prevEl: ".swiper-button-prev",
		nextEl: ".swiper-button-next",
	},

	a11y: {
		prevSlideMessage: "Ir para o cartão anterior",
		nextSlideMessage: "Ir para o próximo cartão",
	},

	spaceBetween: 48,
	slidesPerView: "auto",
	direction: "horizontal",

	effect: "coverflow",
	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
	},
});

} // end
