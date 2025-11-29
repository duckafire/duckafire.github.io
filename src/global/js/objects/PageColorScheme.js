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

if(!Cookies || !Cookies.get)
	throw new InternalError("`js-cookie` API not found.");

const PageColorScheme = Object.freeze(new (class
{
	#auto  = "auto";
	#dark  = "dark";
	#light = "light";

	#cookieName = "color-scheme-mode";
	#classIcons = {
		auto:  "fa-solid fa-circle-half-stroke",
		dark:  "fa-solid fa-moon",
		light: "fa-solid fa-sun",
	};

	AUTO(){  return this.#auto; }
	DARK(){  return this.#dark; }
	LIGHT(){ return this.#light; }

	constructor()
	{
		this.updateMode( Cookies.get( this.#cookieName ) );
		this.#setAutoUpdateEv();
	}

	getMode()
	{
		return document.documentElement.dataset.colorSchemeMode;
	}

	classIconOf(schemeMode)
	{
		return this.#classIcons[ schemeMode || this.getMode() ];
	}

	listModes()
	{
		return Object.keys( this.#classIcons );
	}

	update(scheme)
	{
		this.#isValid(scheme);

		Cookies.set(this.#cookieName, scheme);
		document.documentElement.dataset.colorScheme = scheme;
	}

	updateMode(schemeMode)
	{
		// if false it will use `auto`
		// (default from html)
		if(schemeMode === undefined)
			schemeMode = this.getMode();
		else
			this.#isValid(schemeMode, true);

		// some scheme modes have the
		// same name of some schemes
		let scheme = schemeMode;

		// scheme modes that do not have
		// a scheme with their names
		if(schemeMode === this.#auto)
		{
			if(matchMedia("(prefers-color-scheme: dark)").matches)
				scheme = this.#dark;
			else
				scheme = this.#light;
		}

		this.update(scheme);
		document.documentElement.dataset.colorSchemeMode = schemeMode;
	}

	#setAutoUpdateEv()
	{
		matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (ev) =>
		{
			if(PageColorScheme.getMode() !== PageColorScheme.AUTO())
				return;

			PageColorScheme.update(
				ev.matches
				? PageColorScheme.DARK()
				: PageColorScheme.LIGHT()
			);
		});
	}

	#isValid(scheme, allowModes)
	{
		switch(scheme)
		{
			case this.#dark:
			case this.#light:
				return;

			case this.#auto:
				if(allowModes)
					return;

				throw new InternalError(`[REFUSED] Color scheme modes are invalid here; mode: "${scheme}".`);
		}

		throw new InternalError(`Invalid color scheme: "${scheme}"`);
	}
})());
