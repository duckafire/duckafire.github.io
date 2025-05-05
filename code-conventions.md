# Code conventions

> [HTML](#html) | [CSS](#css) | [SCSS](#scss) | [JS](#js)

> [!IMPORTANT]
> CSS rules apply to SCSS.

## HTML

1. All tags, attributes, *ids*, classes and simular must be written in `cobol-case`.
2. All *open* and *close* tags must be currently aligned.
3. The document must have the tags: `html`, `head`, `title` and `body`.
4. The next `body` tags cannot be duplicated: `header`, `main` and `footer`.
5. All tags must be closed (use `/` for *self-closing tags*: `<br/>`).
6. Attributes values must be between double quotes.
7. Attributes must have a value, even if it is not necessary (like: `async="async"`).
8. `id` must be unique in all document.
9. `alt` must be present in `img` (`alt=" "` for decoration images).
10. Do not use `-` in commentary content (only to declare them).
11. `id` must be present only in single elements that are required by JS.

## CSS

1. Only classes must be used to set style rules.
2. Style must be the most generic possible.
3. Color variables must be prefixed by `--color-`.
4. Avoid most specific variables.

## SCSS

1. `mixin` must be used only shortcut to **single** rules.
2. Declare a new class instead use `extend`.
3. After processing, all rules must be present in `core.css`.
4. Variables must be to store only not dynamic values.

## JS

1. The identifiers must follow the *case styles* below:
* `camelCase`: variables; arrays; objects; parameters.
* `PascalCase`: global objects; global arrays.
* `snake_case`: functions; methods; constants (they have be formed by two, or more, words ).
* `SCREAMING_SCAKE_CASE`: global constants.
2. Functions must be declared like *arrow functions* and stored in constants.
3. All global identifiers must be constants declared in `constants.js`.
4. All scripts must be themselves *sub-environment* (`{ /* code */ }`), except `constans.js`.
5. `var` must not be used.
6. The strict mode must be used in **all** files.
7. `get` must be used only to declare "constants".
8. Do not use *getters* and *setters*.
9. Use private properties to hide values.
10. All properties must be declared inside *constructors*.
11. `this.` must be used to prefix all use of class properties.
12. Use semicolon based in C rules.
