"use strict";

/*

MIT License

Copyright (c) 2025 DuckAfire <https://duckafire.gitlab.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

let __setInertCache__   = null;
let __unsetInertCache__ = null;

// List of CSS elements that must
// be hidden after to run setInert...
const __inertCloseListQueries__ = [
	".nav-cscheme-opt-menu-container",
];

const __inertCloseListElem__ = [];

const __closeElemFromList__ = () =>
{
	if(__inertCloseListElem__.length === 0)
	{
		for(let i = 0, j = 0; i < __inertCloseListQueries__.length; i++, j++)
		{
			__inertCloseListElem__[j] = document.querySelector( __inertCloseListQueries__[i] );

			if(__inertCloseListQueries__[j] === null)
			{
				__inertCloseListQueries__[j] = null;
				j--;
			}
		}
	}

	for(const ELEM of __inertCloseListElem__)
		ELEM.style.display = "none";
};

const __updateInertCache__ = (storage, useCache) =>
{
	if(storage !== null && useCache)
		return storage;

	return document.querySelectorAll("body > *");
}

const clearInertCache = () =>
{
	__setInertCache__   = null;
	__unsetInertCache__ = null;
}

const setInertToBrothers = (elemFocused, useCache) =>
{
	__setInertCache__ = __updateInertCache__(__setInertCache__, useCache);

	for(const ELEM of __setInertCache__)
	{
		if(ELEM === elemFocused || ELEM instanceof HTMLScriptElement)
			continue;

		ELEM.setAttribute("inert", "inert");
	}

	__closeElemFromList__();
};

const unsetInertToBrothers = (useCache) =>
{
	__unsetInertCache__ = __updateInertCache__(__unsetInertCache__, useCache);

	for(const ELEM of __unsetInertCache__)
	{
		if(ELEM instanceof HTMLScriptElement)
			continue;

		ELEM.removeAttribute("inert");
	}
}
