# Code conventions

> [HTML](#html) | [CSS](#css) | [SCSS](#scss) | [JS](#js) | [SH](#sh)

> [!IMPORTANT]
> CSS rules are applied to the SCSS.

## HTML

1. All tags, attributes, *ids*, classes and simular must be written in `cobol-case`.
2. All *open* and *close* tags must be currently aligned.
3. The document must have the tags: `html`, `head`, `title` and `body`.
4. The next `body` tags must not be duplicated: `header`, `main` and `footer`.
5. All tags must be closed (use `/` for *self-closing tags*: `<br/>`).
6. Attributes values must be between double quotes.
7. Attributes must have a value, even if it is not necessary (like: `async="async"`).
8. `id` must be unique in the **whole** document.
9. `alt` must be present in `img` (`alt=" "` for decoration images).
10. Avoid using `-` in commentary content (only to declare them).
11. `id` must be present only in elements that are required by JS.

## CSS

1. Style rules must be based only in classes.
2. Style must be the most generic possible.
3. Color variables must be prefixed by `--color-`.
4. Avoid variables to most specific elements.
5. Prefix responsive non-mobile classes: *table -> `tb:`*; *computer -> `cm:`*.
6. Children must not to use variables directly, only by heritage.

> [!NOTE]
> In CSS, scape `:` with `\`:
> 
> ``` css
> .foo\:bar { /* ... */
> ```

## SCSS

1. `mixin` must be used only shortcut to **single** rules.
2. Declare a new class instead use `extend`.
3. After processing, all rules must be present in `core.css`.
4. Variables must be to store only not dynamic values.
5. **All* files, except `core.scss`, must be prefixed by `_` ("partial files").

## JS

1. The identifiers must follow the *case styles* below:
	* `camelCase`: variables; arrays; objects; parameters.
	* `PascalCase`: classes name; global objects; global arrays.
	* `snake_case`: functions; methods; constants.
	* `SCAKE_CASE`: global constants; constant properties (classes).
2. Functions must be declared like *arrow functions* and stored in constants.
3. All global identifiers must be constants declared in `constants.js`.
4. Scripts must be themselves *sub-environment* (`{ /* code */ }`), except `constans.js`.
5. `var` must not be used.
6. The strict mode must be used in **all** files.
7. `get` must be used only to declare "constants".
8. Do not use *getters* and *setters*.
9. Use private properties to hide values.
10. All properties must be declared (receive a value) inside *constructors*.
11. `this.` must be used to prefix all use of class properties.
12. Use semicolon based in C rules.
13. Classes must be have only one task.
14. Do not declare "things" inside loops.
15. All scripts must be independent (except of content from `constants.js`).

> [!IMPORTANT]
> `constants.js` is the name of the script that declare *global constants*. It the project
> do not have global constants, it file is not exist.

> [!NOTE]
> The correctly is `SCREAMING_SNAKE_CASE`, instead only `SNAKE_CASE`, but the second was
> use because it is most short.

> [!NOTE]
> `snake_case` identifiers have to be formed by least two words. This avoid that these
> identifier are confused with `camelCase` identifiers.

## SH

1. The identifiers must follow the *case styles* below:
  * `camelCase`: local variables; local arrays.
  * `PascalCase`: global variables; global arrays.
  * `snake_case`: functions.
  * `SNAKE_CASE`: constants (except arrays and *argument-variables*).
2. Explicit declaration with `declare`, `local` and `function`.
3. Explicit identifier type (-i; -a; -A; ...).
4. Only arrays must be used with `${}`.
5. All that "return" a string must be between double quotes.
6. Arrays must be "readonly".
7. No aligned functions (except to "single command functions").

> [!NOTE]
> The correctly is `SCREAMING_SNAKE_CASE`, instead only `SNAKE_CASE`, but the second was
> use because it is most short.

> [!NOTE]
> `snake_case` identifiers have to be formed by least two words. This avoid that these
> identifier are confused with `camelCase` identifiers.