import { dirname, basename } from "path";

import { defineConfig }          from "vite";
import { createHtmlPlugin }      from "vite-plugin-html";
import reactBabel                from "@vitejs/plugin-react";
import reactSWC                  from "@vitejs/plugin-react-swc";
import legacyJS                  from "@vitejs/plugin-legacy";
import { browserslistToTargets } from "lightningcss";
import browserslist              from "browserslist";

export default defineConfig(({ command }) => {
	const IS_PROD = (command === "build");

	const REACT_OPT = { jsxRuntime: "classic" };

	const plugins = [
		legacyJS({ targets: ["ie >= 11"], additionalLegacyPolyfills: ["regenerator-runtime/runtime"] }),
		IS_PROD ? reactBabel( REACT_OPT ) : reactSWC( REACT_OPT ),
	];

	const css = {
		preprocessorOptions: { scss: { api: "modern" } },
		devSourcemap: !IS_PROD,
	};

	const build = {
		target: "es2015",

		terserOptions: {
			compress: { passes: 2 },
			mangle: { toplevel: true },
			format: { comments: false },
		},

		rollupOptions: {
			output: {
				entryFileNames: "assets/[name]-[hash].js",
				chunkFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
		},
	};

	const OPTS = {};

	if(IS_PROD)
	{
		plugins.push( createHtmlPlugin({ minify: IS_PROD }) );

		css.transformer = "lightningcss";
		css.lightningcss = {
			targets: browserslistToTargets( browserslist(">= 0.25%, ie 11") ),
		};

		build.minify = "terser";
		build.cssMinify = "lightningcss";
	}
	else
	{
		OPTS.server = {
			port: 8080,
			hmr: { overlay: true },
		}
	}

	OPTS.plugins = plugins;
	OPTS.css     = css;
	OPTS.build   = build;

	return OPTS;
});

