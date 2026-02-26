"use strict";

/*
 * MIT License
 *
 * Copyright (c) 2026 DuckAfire <https://duckafire.gitlab.io>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const { resolve } = require("path");

const SRC_DIR  = resolve("src");
const DEST_DIR = resolve("dest");

const scanOpt = {cmd: SRC_DIR, absolute: true};

module.exports = {
	SRC_DIR,
	DEST_DIR,
	getFiles: (globPattern = null) => Array.from(
		(new Bun.Glob(globPattern)).scanSync( scanOpt )
	),
	destFileName: async (srcExt = null, destExt = null) => srcExt == null || destExt == null
		? `${resolve( DEST_DIR )}/${FILE.replace( SRC_DIR, "" )}`
		: `${resolve( DEST_DIR )}/${FILE.replace( SRC_DIR, "" ).replace(srcExt, destExt)}`,
};

