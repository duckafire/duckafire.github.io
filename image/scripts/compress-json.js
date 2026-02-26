#!/usr/bin/env node
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

const FS = require("fs");

const SRC = process.argv[2];
const JSON_CONTENT = FS.readFileSync(SRC, "utf-8");

const is_white_space = (c) => (/\s/).test(c);

let c, buffer = "";
let isstring = false, isbackslash = false;

for(let i = 0; i < JSON_CONTENT.length; i++)
{
	c = JSON_CONTENT.charAt(i);

	if(!isbackslash && c === "\"")
		isstring = !isstring;

	if(isbackslash)
	{
		isbackslash = false;
	}
	else if(c === "\\")
	{
		isbackslash = true;
	}

	if(isstring || !is_white_space(c))
		buffer += c;
}

console.log(buffer);
