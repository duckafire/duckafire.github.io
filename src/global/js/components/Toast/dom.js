"use strict";

/*

Copyright (C) 2025 DuckAfire <https://duckafire.gitlab.io>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

class Toast
{
	static #QUEUE = null;
	static #DELAY = 0;

	static SUCC(){ return "success"; }
	static INFO(){ return "information"; }
	static WARN(){ return "warning"; }
	static ERRO(){ return "error"; }

	constructor(text, type, devtext)
	{
		const div = document.createElement("span")
		div.className    = "toast";
		div.textContent  = text;
		div.dataset.type = type;

		setTimeout(() =>
		{
			Toast.destructor(div);
		}, Toast.#DELAY);

		Toast.#QUEUE.appendChild(div);

		Toast.#printInConsole(type, devtext);
	}

	static destructor(elem)
	{
		Toast.#QUEUE.removeChild(elem);
	}

	static #printInConsole(type, devtext)
	{
		if(devtext === undefined)
			return;

		switch(type)
		{
			case Toast.SUCC(): console.log(   devtext ); break;
			case Toast.INFO(): console.info(  devtext ); break;
			case Toast.WARN(): console.warn(  devtext ); break;
			case Toast.ERRO(): console.error( devtext ); break;
		}
	}

	static createContainer()
	{
		if(Toast.#QUEUE !== null)
			return;

		document.body.appendChild(
			(Toast.#QUEUE = DIV( {className: "toast-queue"}, DIV))
		);

		Toast.#DELAY = parseInt( getComputedStyle(Toast.#QUEUE).getPropertyValue("--child-time-to-live") ) * 1000;
	}
};

// This have to be called before
// the end of this script;
// `new Toast` must not be
// called before this.
Toast.createContainer();
