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

document.body.appendChild(
	FOOTER( {className: "page-footer", cssRules: {"--bg": "var(--C_ANTHRACITE)"}},
		SPAN( {className: "footer-text-line"},
			"DuckAfire's Nest Copyright (C) 2025 DuckAfire",
		SPAN),
		SPAN( {className: "footer-text-line"},
			"Source code: ",
			A( {className: "footer-url", href: "https://github.com/duckafire/duckafire.github.io"},
				"GitHub",
			A),
			"; ",
			A( {className: "footer-url", href: "https://gitlab.com/duckafire/duckafire.gitlab.io"},
				"GitLab",
			A),
			".",
		SPAN),
		SPAN( {className: "footer-text-line"},
			"License: ",
			A( {className: "footer-url", href: "https://www.gnu.org/licenses/agpl-3.0.en.html"},
				"AGPL3",
			A),
			".",
		SPAN),
	FOOTER)
);
