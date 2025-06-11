"use strict";
{ // start

const new_card = (title, description, cover_src, used_tech, highlight) => ({
	title,
	description,
	cover_src,
	used_tech,
	highlight
});

DATA_JSON.cards = [
	new_card(
		"Legendary Champion: Rebirth",
		"Adentre arenas de combate com visual retrô e encarre um desafio frenético, onde seu úncio " +
		"objetivo é proteger suas CARGAS. Fuja e esconda-se de inimigos únicos e incansáveis. Corra "+
		"em direção à glária da vitória!",
		get_image("foo.svg"),
		null,
		null
	),
	new_card(
		"Tiny Library",
		"Está é uma coleção de pequenas bibliotecas de código aberto, desenvolvidas em Lua para "   +
		"facilitar e otimizar o desenvolvimento de jogos (cartuchos) para o console/computador de " +
		"fantasia Tic80 Tiny Computer.",
		get_image("foo.svg"),
		null,
		null
	),
	new_card(
		"LIM",
		"\"Lua library compactor\" é um pequeno programa de terminal, criado para facilitar a "     +
		"compactação de bibliotecas Lua (principalmente para o projeto TinyLibrary) em um formato " +
		"apelidado de Pacote Local.",
		get_image("foo.svg"),
		["*c-plain"],
		{
			homePage: {
				link: da_github("LIM"),
				icon: "fa-brands fa-github",
			}
		}
	),
	new_card(
		"Small Projects",
		"Um \"Frankenstein\" de bibliotecas, resumos, automações e TUDO que mais que você possa " +
		"imaginar (ou não). Esse pequeno projeto foi criado para dar um lar a projetos pequenos " +
		"demais para exigir um repositório próprio.",
		get_image("foo.svg"),
		null,
		null
	),
	new_card(
		"DuckAfire's Nest",
		"Este é o projeto que você está utilizando agora (hehe)! Uma página web discutivelmente " +
		"pequena e minimalista, pensada para conectar e exibir meus projetos de maneira "         +
		"centralizada. Um grande OBRIGADO aos mantenedores do projeto GitHub Pages!!",
		get_image("foo.svg"),
		["*html5-plain", "*sass-original", "*javascript-plain"],
		{
			homePage: {
				link: da_github("nest"),
				icon: "fa-brands fa-github",
			}
		}
	),
	new_card(
		"Calculadora",
		"Uma calculadora simples, desenvolvida para realizar operações matemáticas báscias, com "    +
		"suporte a números negativos e decimais. Possui uma interface responsiva, desenvolvida com " +
		"Java Swing, capaz de se adaptar aos mais diversos tamanhos de janela.",
		get_image("foo.svg"),
		["*java-plain"],
		{
			homePage: {
				link: da_github("java-swing-calculator"),
				icon: "fa-brands fa-github",
			}
		}
	),
];

} // end
