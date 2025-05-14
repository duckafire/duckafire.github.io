"use strict";
{ // start

// TODO add lazy loading

new Swiper(".manual-vertical-swiper", {
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
		prevEl: ".vertical-swiper-btn-prev",
		nextEl: ".vertical-swiper-btn-next",
	},

	a11y: {
		prevSlideMessage: "Ir para o cartão anterior",
		nextSlideMessage: "Ir para o próximo cartão",
	},
});

} // end
