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

// any "invalid types"
if(Cookies == undefined || Cookies.get == undefined)
	throw new InternalError("`js-cookie` API not found.");

const PageColorScheme = new (class
{
	#auto  = "auto";
	#dark  = "dark";
	#light = "light";
	#classIcons = {
		auto:  "fa-solid fa-circle-half-stroke",
		dark:  "fa-solid fa-moon",
		light: "fa-solid fa-sun",
	};

	AUTO(classIcon){  return (classIcon) ? this.#classIcons[ this.#auto  ] : this.#auto; }
	DARK(classIcon){  return (classIcon) ? this.#classIcons[ this.#dark  ] : this.#dark; }
	LIGHT(classIcon){ return (classIcon) ? this.#classIcons[ this.#light ] : this.#light; }

	classIconOf(scheme)
	{
		return this.#classIcons[ scheme ];
	}

	list()
	{
		return [
			this.#auto,
			this.#dark,
			this.#light,
		];
	}

	getCurrent(classIcon)
	{
		if(classIcon)
			return this.#classIcons[ document.documentElement.dataset.colorScheme ];

		return document.documentElement.dataset.colorScheme;
	}

	constructor()
	{
		const SCHEME = Cookies.get("colorscheme");

		if(SCHEME !== undefined)
		{
			document.documentElement.dataset.colorScheme = SCHEME;
			return;
		}

		if(this.#isPreferColorSchemeDark())
			this.update( this.#dark );
		else
			this.update( this.#light );
	}

	update(scheme)
	{
		this.#isValid(scheme);

		Cookies.set("colorscheme", scheme);
		document.documentElement.dataset.colorScheme = scheme;
	}

	#isPreferColorSchemeDark()
	{
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	#isValid(scheme)
	{
		if(scheme === this.#auto || scheme === this.#dark || scheme == this.#light)
			return;

		throw new InternalError(`Invalid theme: "${scheme}"`);
	}
})();
