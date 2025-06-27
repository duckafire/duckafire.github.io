"use strict";

{

const new_tech = (lang, langIcon) => ({ lang, langIcon });

const new_langs = (...lang_cards) => {
	let name, suffix, complement;
	const langs = [];

	for(const card of lang_cards){
		name       = card[0];
		suffix     = card[1];
		complement = card[2];

		langs.push({
			name,
			icon: name.toLowerCase() + (complement || "") + "-" + suffix,
		});
	}

	return langs;
}

const new_homepage = (link, icon) => ({
	link: da_github(link),
	icon: icon || "fa-brands fa-github",
});

const new_data = (title, description, cover, tech, homepage, isHighlight) => ({
	title,
	description,
	cover,
	tech,
	homepage,
	isHighlight,
});

const cards_data = [
	new_data(
		"Legendary Champion: Rebirth",
		"Adentre arenas de combate com visual retrô e encarre um desafio frenético, onde seu úncio " +
		"objetivo é proteger suas CARGAS. Fuja e esconda-se de inimigos únicos e incansáveis. Corra "+
		"em direção à glária da vitória!",
		get_image("foo.svg"),
		null,
		null,
		false,
	),
	new_data(
		"Tiny Library",
		"Está é uma coleção de pequenas bibliotecas de código aberto, desenvolvidas em Lua para "   +
		"facilitar e otimizar o desenvolvimento de jogos (cartuchos) para o console/computador de " +
		"fantasia Tic80 Tiny Computer.",
		get_image("foo.svg"),
		null,
		null,
		false,
	),
	new_data(
		"LIM",
		"\"Lua library compactor\" é um pequeno programa de terminal, criado para facilitar a "     +
		"compactação de bibliotecas Lua (principalmente para o projeto TinyLibrary) em um formato " +
		"apelidado de Pacote Local.",
		get_image("foo.svg"),
		new_langs(
			["C", "plain"]
		),
		new_homepage("LIM"),
		true,
	),
	new_data(
		"Small Projects",
		"Um \"Frankenstein\" de bibliotecas, resumos, automações e TUDO que mais que você possa " +
		"imaginar (ou não). Esse pequeno projeto foi criado para dar um lar a projetos pequenos " +
		"demais para exigir um repositório próprio.",
		get_image("foo.svg"),
		null,
		null,
		false,
	),
	new_data(
		"DuckAfire's Nest",
		"Este é o projeto que você está utilizando agora (hehe)! Uma página web discutivelmente " +
		"pequena e minimalista, pensada para conectar e exibir meus projetos de maneira "         +
		"centralizada. Um grande OBRIGADO aos mantenedores do projeto GitHub Pages!!",
		get_image("foo.svg"),
		new_langs(
			["HTML", "plain", "5"],
			["SASS", "original"],
			["JavaScript", "plain"]
		),
		new_homepage("nest"),
		true,
	),
	new_data(
		"Calculadora",
		"Uma calculadora simples, desenvolvida para realizar operações matemáticas báscias, com "    +
		"suporte a números negativos e decimais. Possui uma interface responsiva, desenvolvida com " +
		"Java Swing, capaz de se adaptar aos mais diversos tamanhos de janela.",
		get_image("foo.svg"),
		new_langs(
			["Java", "plain"]
		),
		new_homepage("java-swing-calculator"),
		true,
	),
];

const normal    = new FromTo("#normal-card", "#cards-container");
const highlight = new FromTo("#highlight-card", "#highlight-cards-container");

highlight.createElem = (data) => {
	$("img", highlight.template).src         = data.cover;
	$("h1",  highlight.template).textContent = data.title;

	if(data.tech !== null){
		const tech = $(".highlight-card-tech", highlight.template);
		let quant = 0;
		let icon;

		for(const lang of data.tech){
			if(++quant > data.techMax || quant > 5)
				break;

			icon = document.createElement("i");

			icon.title     = lang.name;
			icon.className = (quant < 5) ? "devicon-" + lang.icon : "fa-solid fa-plus";

			tech.appendChild(icon);
		}
	}

	if(data.homepage !== null){
		const homepageBtn = $(".highlight-card-homepage-btn", highlight.template);
		homepageBtn.children[0].href                  = data.homepage.link; // <a>
		homepageBtn.children[0].children[0].className = data.homepage.icon; // <i>
	}

	highlight.appendTemplate();
}

normal.createElem = (data) => {
	$("img", normal.template).src         = data.cover;
	$("h1",  normal.template).textContent = data.title;
	$("p",   normal.template).textContent = data.description;

	normal.appendTemplate();
}

for(const data of cards_data){
	normal.createElem(data);

	if(data.isHighlight)
		highlight.createElem(data);
}

/* after render them */
const highlight_card_width  = parseInt(getComputedStyle($(".highlight-card-title-container")).width);
const highlight_cards_title = $("@.highlight-card-title");

for(const title of highlight_cards_title){
	if(title.scrollWidth <= highlight_card_width){
		title.style.animation = "none";
		continue;
	}

	title.style.paddingLeft = "1rem";

	title.style.setProperty(
		"--text-length",
		String( title.scrollWidth + highlight_card_width ) + "px"
	);
}

}
