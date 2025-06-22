# Code conventions

> [HTML](#html) | [CSS](#css) | [SCSS](#scss) | [JS](#js) | [SH](#sh)

> [!IMPORTANT]
> CSS rules are applied to the SCSS.

## HTML

1. All tags, attributes, *ids*, classes and simular must be written in `cobol-case`.
1. All *open* and *close* tags must be currently aligned.
1. All tags must be closed (use `/` for *self-closing tags*: `<br/>`).

1. Attributes values must be between double quotes.
1. Attributes must have a value, even if it is not necessary (like: `async="async"`).
1. Distinct pages must container only one: `html`; `title`; `body`; `main`; `footer`.
1. Customized attributes must be prefixed by `data-`.
1. `id` must be unique in the **whole** document.
1. `id` must be present only in elements that are required by JS.
1. `alt` must be present in `img` (`alt=" "` for decoration images).
1. `img` must container the property `loading`, with the value `"lazy"`.
1. `a` must container the property `rel", with the values `"noopener noreferrer"`.

1. Classes of different layouts must be in distinct lines.
1. Declaration of CSS variables must be indented.
1. Only `display:none` and variables declaration can to be in `style` property.

1. Avoid using `-` in commentary content (only to declare them).

## CSS

1. Style rules must be based only in classes.
1. Style must be the most generic possible.

1. Color variables must be prefixed by `--color-`.
1. Avoid variables to most specific elements.
1. Children must not to use variables directly, only by heritage.

1. Prefix responsive *non-mobile* classes: *tablet -> `tb:`*; *computer -> `cm:`*.

> [!NOTE]
> In CSS, scape `:` with `\`:
> 
> ``` css
> .foo\:bar { /* ... */
> ```
>
> It is not necessary in the HTML.
> 
> ``` html
> <div class="flex
>             tb:grid">
> ```

## SCSS

1. `mixin` must be used only shortcut to **single** rules.
1. Declare a new class instead use `extend`.

1. Variables must be to store only not dynamic values.

1. After processing, all rules must be present in `core.css`.
1. **All** files, except `core.scss`, must be prefixed by `_` ("partial files").

## JS

1. The identifiers must follow the *case styles* below:
	* `camelCase`: variables; arrays; objects; parameters.
	* `PascalCase`: classes name; global objects; global arrays.
	* `snake_case`: functions; methods; constants.
	* `SCAKE_CASE`: global constants; constant properties (classes).

1. The strict mode must be used in **all** files.
1. `var` must not be used.
1. Functions must be declared like *arrow functions* and stored in constants.
1. Scripts must be themselves *sub-environment* (`{ /* code */ }`), except `constans.js`.
1. Use semicolon based in C rules.
1. Do not declare "things" inside loops.


1. `get` must be used only to declare "constants".
1. Avoid using *getters* and *setters*.
1. Use private properties to hide values that they are unnecessary outside the object.
1. All properties must be declared (receive a value) inside *constructors*.
1. `this.` must be used to prefix all use of class properties.
1. Classes must be have only one task.

1. All global identifiers must be constants declared in `constants.js`.
1. All scripts must be independent (except of content from `constants.js`).

> [!IMPORTANT]
> `constants.js` is the name of the script that declare *global constants*. If the project
> do not have global constants, it file is not exist.

> [!NOTE]
> The correctly is `SCREAMING_SNAKE_CASE`, instead only `SNAKE_CASE`, but the second was
> used because it is most short.

> [!NOTE]
> `snake_case` identifiers have to be formed by least two words. This avoid that these
> identifiers are confused with `camelCase` identifiers.

## SH

1. The identifiers must follow the *case styles* below:
  * `camelCase`: local variables; local arrays.
  * `PascalCase`: global variables; global arrays.
  * `snake_case`: functions.
  * `SNAKE_CASE`: constants (except arrays and *argument-variables*).

1. Explicit declaration with `declare`, `local` and `function`.
1. Explicit identifier type (-i; -a; -A; ...).
1. Only arrays must be used with `${}`.
1. Arrays must be "readonly".

1. All that "return" a string must be between double quotes.

1. Do not align functions.

> [!NOTE]
> The correctly is `SCREAMING_SNAKE_CASE`, instead only `SNAKE_CASE`, but the second was
> used because it is most short.

> [!NOTE]
> `snake_case` identifiers have to be formed by least two words. This avoid that these
> identifiers are confused with `camelCase` identifiers.
