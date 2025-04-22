new Swiper(".hi--projects-cards-swiper", {
	// TODO add lazy loading
	centeredSlides: true,
	preventClicks: true,
	preventClicksPropagation: true,

	slidesPerView: 1,
	spaceBetween: 48,

	slidesPerView: "auto",

	navigation: {
		prevEl: ".swiper-button-prev",
		nextEl: ".swiper-button-next",
	},

	a11y: {
		prevSlideMessage: "Ir para o cartão anterior",
		nextSlideMessage: "Ir para o próximo cartão",
	},
});
