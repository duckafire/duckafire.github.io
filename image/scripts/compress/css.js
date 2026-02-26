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

const CleanCSS = require("clean-css");

const { SRC_DIR, DEST_DIR, getFiles, destFileName } = require("./common.cjs");

const OPT = {
	inline: ["none"],
	inlineRequest: undefined,
	inlineTimeout: 0,

	sourceMap: false,
	sourceMapInlineSources: false,

	rebase: false,
	toRebase: "",

	batch: true,
	returnPromise: true,
	fetch: undefined,

	compatibility: {
		colors: {
			hexAlpha: true, // #rgba, #rrggbbaa
			opacity:  true, // rgba(), hsla()
		},
		properties: {
			// Merge into shorthand:
			backgroundClipMerging:   true,
			backgroundOriginMerging: true,
			backgroundSizeMerging:   true,

			// IE
			ieBangHack:   false,
			ieFilters:    false,
			iePrefixHack: false,
			ieSuffixHack: false,

			colors:  true,                 // color optimizations
			merging: true,                 // merge property based on understandability
			shorterLengthUnits: false,     // `px` to (short unit): `pc`, `pt`, or `in`
			spaceAfterClosingBrace: false, // keep space after close-parenthesis
			urlQuotes: true,               // keep quoting inside `url()`
			zeroUnits: true,               // remove unit `0`
		},
		selectors: {
			adjacentSpace: false,        // extra space before element
			mergeLimit: 8191,            // maximum number of selectors in a single rule
			multiplePseudoMerging: true, // merge rules with multiple pseudo classes/elements

			// e.g.: `*+html...`
			ie7Hack: true,

			// whitelists
			mergeablePseudoClasses: [],
			mergeablePseudoElements: [],
		},
		// [all: true] They enable support to STUFF unit
		units: { ch: true, vh: true, in: true, vm: true, pc: true, vmax: true, pt: true, vmin: true, rem: true, },
	},

	format: {
		breakWith:  "",    // string used to "new line"
		indentBy:   0,     // number of characters to indentation
		indentWith: "tab", // type of indentation (space or tab)
		wrapAt:     false, // set maximum line length (false === infinite)
		semicolonAfterLastProperty: false, // allow semicolon after last rule of a block

		// [all: false] Line feed after STUFF
		breaks: { afterAtRule: false, afterBlockBegins: false, afterBlockEnds: false, afterComment: false, afterProperty: false, afterRuleBegins: false, afterRuleEnds: false, beforeBlockEnds: false, betweenSelectors: false },

		// Where to insert spaces:
		spaces: { // where to insert spaces:
			aroundSelectorRelation: false, // allow space came around selector relations
			beforeBlockBegins: false,      // allow space before a block begin
			beforeValue: false,            // allow space before a value
		},
	},

	level: {
		"1": {
			cleanupCharsets:        false,// allow to move @charset to the front of a stylesheet
			normalizeUrls:          true, // allow URL normalization

			// allow to optimize:
			optimizeBackground:     true,
			optimizeBorderRadius:   true,
			optimizeFilter:         true,
			optimizeFont:           true,
			optimizeFontWeight:     true,
			optimizeOutline:        true,

			// allow to remove:
			removeEmpty:            true, // rules; and nested blocks
			removeNegativePaddings: true,
			removeQuotes:           true, // when unnecessary
			removeWhitespace:       true, // when unnecessary

			// allow to replace:
			replaceMultipleZeros:   true, // 000 -> 0
			replaceTimeUnits:       true, // 1000ms -> 1s
			replaceZeroUnits:       true, // 0px -> 0; 0rem -> 0

			roundingPrecision:      false,// rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
			tidyAtRules:            true, // controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
			tidyBlockScopes:        true, // controls block scopes (e.g. `@media`) optimizing; defaults to `true`
			tidySelectors:          true, // controls selectors optimizing; defaults to `true`,

			selectorsSortingMethod: "standard", // "natural", "standard", "none", or false
			specialComments:        "all",      // set number of `/*! ... */` (comment) preserved

			// value optimizers which are applied to variables:
			variableValueOptimizers: [],
		},
		"2": {
			// allow to merge:
			mergeAdjacentRules: true,
			mergeIntoShorthands: true,
			mergeMedia: true,
			mergeNonAdjacentRules: true,
			mergeSemantically: false,

			// allow to remove:
			removeEmpty: true, // rules/nested blocks
			removeDuplicateFontRules: true,
			removeDuplicateMediaBlocks: true,
			removeDuplicateRules: true,
			removeUnusedAtRules: false,

			overrideProperties: true,     // allow property overriding based on understandability
			reduceNonAdjacentRules: true, // allow to reduce non-adjacent
			restructureRules: false,      // allow rule restructuring

			// which properties will not be optimized:
			skipProperties: [], // controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
		},
	},
};

const INPUT = getFile("**/*.css");

new CleanCSS( OPT )
	.minify( INPUT )
	.then(async (output) =>
	{
		for(const FILE in output)
		{
			if(output[ FILE ].warnings.length > 0)
				for(const WARN of output[ FILE ].warnings)
					console.warn( WARN );

			if(output[ FILE ].errors.length > 0)
			{
				for(const ERR of output[ FILE ].errors)
					console.error( ERR );

				throw new Error();
			}

			await Bun.write(
				destFileName(".css", ".min.css"),
				output[ FILE ].styles
			);
		}
	})
	.catch((errors) =>
	{
		throw new Error( errors );
	});

