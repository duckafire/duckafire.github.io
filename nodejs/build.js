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
const PATH = require("path");
const { execSync } = require("child_process");

const directoriesNoExplorable = ["asserts"];
const scssPartialFiles = [];

const is_empty_dir = (dir) => FS.readdirSync(dir).length === 0;
const is_it = (wantedExt, fileExt) => PATH.extname(fileExt).slice(1) === wantedExt;
const shell = (cmd) => execSync(cmd, {shell: true});

const can_it_explore = (dir) =>
{
	for(const ignorable of directoriesNoExplorable)
	{
		if(dir == ignorable)
			return false;
	}

	return true;
};

const explore_source_files = (dir) =>
{
	let file;

	for(const filename of FS.readdirSync(dir))
	{
		file = PATH.join(dir, filename);

		if(FS.statSync(file).isDirectory())
		{
			if(can_it_explore(filename))
				explore_source_files(file);

			continue;
		}

		if(is_it("html", file))
		{
			// nothing for now
		}
		else if(is_it("css", file))
		{
			shell(`echo "$(npx cleancss "${file}")" > "${file}"`)
		}
		else if(is_it("js", file))
		{
			shell(`echo "$(npx terser "${file}" --compress --mangle)" > "${file}"`)
		}
		else if(is_it("scss", file))
		{
			if(filename.charAt(0) != "_")
			{
				shell(`npx sass "${file}:${file.replace(/\.scss$/, ".css")}" --style=compressed --no-source-map`)
				FS.unlinkSync(file);
			}
			else
			{
				scssPartialFiles.push(file);
			}
		}
		else if(is_it("json", file))
		{
			shell(`echo "$(npm run compress-json "${file}")" > "${file}"`)
		}
		else
		{
			// delete "strange files"
			FS.unlinkSync(file);
		}
	}
};

const clear_empty_directories = (rootdir) =>
{
	// it recursively deletes empty directories
	// and, consequently, directories that have
	// only empty subdirectories
	let dir;

	for(const dirname of FS.readdirSync(rootdir))
	{
		dir = PATH.join(rootdir, dirname);

		if(!FS.statSync(dir).isDirectory())
			continue;

		clear_empty_directories(dir);

		if(is_empty_dir(dir))
			FS.rmdirSync(dir);
	}
};

const add_redirecting_pages = (rootdir) =>
{
	const REDIRECTOR_FILE    = PATH.join(rootdir, "asserts/pages/redirector.html");
	const REDIRECTOR_CONTENT = FS.readFileSync( REDIRECTOR_FILE );

	let dir;
	for(const dirname of [null, "nest", "pages"])
	{
		dir = dirname === null ? rootdir : PATH.join(rootdir, dirname);

		if(!FS.existsSync(dir))
			FS.mkdirSync(dir, {recursive: true});

		FS.writeFileSync( PATH.join(dir, "index.html"), REDIRECTOR_CONTENT);
	};

	FS.unlinkSync(REDIRECTOR_FILE);
};

const ROOT_DIR =
	PATH.join(
		PATH.dirname(
			FS.realpathSync(__filename)
		),
		"public"
	);

explore_source_files(ROOT_DIR);
add_redirecting_pages(ROOT_DIR);

// delete them; it must be called before
// `clear_emp...`, because some directories
// can be empty after the files will be
// deleted
scssPartialFiles.forEach(file => FS.unlinkSync(file));

// it is called after `explore_s...` because
// "strange files" can disturbing the algorithm
clear_empty_directories(ROOT_DIR);
