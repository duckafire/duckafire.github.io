"use strict";
{ // start

new Swiper(".manual-vert-swiper", {
	centeredSlides: true,
	preventClicks: true,
	preventClicksPropagation: true,

	allowTouchMove: false,

	slidesPerView: "auto",
	effect: "coverflow",

	spaceBetween: 50,

	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
	},

	navigation: {
		prevEl: ".vert-swiper-btn-prev",
		nextEl: ".vert-swiper-btn-next",
	},

	a11y: {
		prevSlideMessage: "Ir para o cartão anterior",
		nextSlideMessage: "Ir para o próximo cartão",
	},
});

} // end
