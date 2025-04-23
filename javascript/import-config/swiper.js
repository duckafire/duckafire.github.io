new Swiper(".hi--projects-cards-swiper", {
	// TODO add lazy loading
	centeredSlides: true,
	preventClicks: true,
	preventClicksPropagation: true,
	allowTouchMove: false,

	effect: "coverflow",
	slidesPerView: "auto",

	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
	},

	navigation: {
		prevEl: ".swiper-button-prev",
		nextEl: ".swiper-button-next",
	},

	a11y: {
		prevSlideMessage: "Ir para o cartão anterior",
		nextSlideMessage: "Ir para o próximo cartão",
	},

	breakpoints: {
		0: {
			spaceBetween: 48,
		},
	}
});
