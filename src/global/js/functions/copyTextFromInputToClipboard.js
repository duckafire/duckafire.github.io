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

const copyTextToastSuccess = () =>
{
	if(typeof Toast !== "undefined")
		new Toast("URL copied", Toast.SUCC());
}

const copyTextToastFailure = () =>
{
	if(typeof Toast !== "undefined")
		new Toast("Impossible copy the URL", Toast.ERRO());
}

// it must be called by a "event"
const copyTextFromInputToClipboard = (input) =>
{
	if(!(input instanceof HTMLInputElement))
	{
		throw new TypeError(
			"Invalid element type: \"" +
			(input
				? (input.constructor
					? input.constructor.name
					: toString(input))
				: toString(input)
			) + "\""
		);
		copyTextToastFailure();
		return;
	}

	if(navigator.clipboard && navigator.clipboard.writeText)
	{
		navigator.clipboard.writeText(input.value)
			.then(() =>
			{
				copyTextToastSuccess();
			})
			.catch((ex) =>
			{
				console.error(ex, new InternalError("Clipboard API failure."));
				copyTextToastFailure();
			});

		return;
	}

	console.error(new InternalError("Clipboard API not found."));

	input.focus();
	input.select();
	input.setSelectionRange(0, input.value.length);

	try
	{
		if(!document.execCommand("copy"))
			throw new InternalError("Impossible copy the element content");

		copyTextToastSuccess();
	}
	catch(ex)
	{
		console.error(
			ex,
			new InternalError(
				ex instanceof TypeError
					? "Legacy Clipboard API not found"
					: "Legacy Clipboard API failure."
			)
		);
		copyTextToastFailure();
	}

	input.blur();
};
