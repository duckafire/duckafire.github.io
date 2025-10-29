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
	static #QUEUE = document.querySelector(".toast-queue");
	static #DELAY = parseInt( getComputedStyle(Toast.#QUEUE).getPropertyValue("--child-time-to-live") ) * 1000;;

	constructor(text, consoleInfo)
	{
		const div = document.createElement("span")
		div.className   = "toast";
		div.textContent = text;

		setTimeout(() =>
		{
			Toast.destructor(div);
		}, Toast.#DELAY);

		Toast.#QUEUE.appendChild(div);

		Toast.#console(text, consoleInfo);
	}

	static destructor(elem)
	{
		Toast.#QUEUE.removeChild(elem);
	}

	static #console(text, consoleInfo)
	{
		if(consoleInfo === undefined)
			return;

		const [METHOD, MESSAGE] = Array.isArray(consoleInfo)
			? consoleInfo
			: [consoleInfo, text];

		if(!console[METHOD])
			throw new TypeError(`\`console\` method not found: "${METHOD}"`);

		console[METHOD](MESSAGE);
	}
};
