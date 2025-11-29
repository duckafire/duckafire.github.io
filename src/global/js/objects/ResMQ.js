"use strict";

/*

Zlib License

Copyright (C) 2025 DuckAfire <https://duckafire.gitlab.io>

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.

*/

/* IMPORTANT: values from g/scss/responsive-media-queries. */

/* RESponive Media Queries */
const ResMQ = Object.freeze(new (class
{
	#fontSize = null;

	#pxValues = {}; // same fields from below
	#remValues = {
		screenWMin:  20,
		tabletMin:   30,
		computerMin: 64,
		mobileMax:   30, // ... - 1
		tabletMax:   64, // ... - 1
	};

	#upValue(variable, isMax = false)
	{
		this.#pxValues[ variable ] = this.#remValues[ variable ] * this.#fontSize - Number(isMax);
	}

	#updateValues()
	{
		const FONT_SIZE = parseInt( getComputedStyle( document.documentElement ).fontSize );

		if(this.#fontSize !== null && this.#fontSize === FONT_SIZE)
			return;

		this.#fontSize = FONT_SIZE;

		this.#upValue("screenWMin");
		this.#upValue("tabletMin");
		this.#upValue("computerMin");
		this.#upValue("mobileMax", true);
		this.#upValue("tabletMax", true);
	}

	onlyMinScreenW()
	{
		this.#updateValues();
		return window.innerWidth <= this.#pxValues.screenWMin;
	}

	onlyMobile()
	{
		this.#updateValues();
		return window.innerWidth <= this.#pxValues.mobileMax;
	}

	onlyNoMobile()
	{
		this.#updateValues();
		return window.innerWidth > this.#pxValues.mobileMax;
	}

	onlyTablet()
	{
		this.#updateValues();
		return window.innerWidth >= this.#pxValues.tabletMin
			&& window.innerWidth <= this.#pxValues.tabletMax;
	}

	onlyNoTablet()
	{
		this.#updateValues();
		return window.innerWidth < this.#pxValues.tabletMin
			|| window.innerWidth > this.#pxValues.tabletMax;
	}

	onlyComputer()
	{
		this.#updateValues();
		return window.innerWidth >= this.#pxValues.computerMin;
	}

	onlyNoComputer()
	{
		this.#updateValues();
		return window.innerWidth < this.#pxValues.computerMin;
	}

})());
