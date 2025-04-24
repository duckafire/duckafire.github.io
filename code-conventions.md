# Code conventions

> [HTML](#html) | [CSS](#css) | [JS](#js)

## HTML

1. All tags and attributes must be written in lower case.

``` html
<DIV CLASS="foo"> wrong </DIV>

<div class="foo"> right </div>
```

2. All tags must be correctly aligned.

``` html
<p><strong> wrong </p></strong>

<p><strong> right </strong></p>
```

3. The document must be *well formatted*.

``` html
<!DOCTYPE html>
<html>
<head>
	<title>foo</title>
</head>
<body>
</body>
</html>
```

4. **All** tags must be closed.

``` html
<p> wrong <br>

<p> right <br/></p>
```

5. Tag attributes must be written in lower case, they must not be "empty" and their values
must be between double quotes.

``` html
<textarea rows=3> wrong </textarea>

<textarea rows="3"> wrong </textarea>
```

> Elements whose attributes do not need a value must receive themselves, like string
> (`async="async"`).

6. `id` must be unique in document.

``` html
<div>
	<span id="foo"> wrong </span>
</div>
<span id="foo"> WRONG </span>

<div>
	<span id="foo"> right </span>
</div>
<span id="FOO"> RIGHT </span>
```

7. `alt` must be present in `img`, 

``` html
<div><img src="./foo.png" /> wrong </div>

<div><img src="./foo.png" alt="foo image"/> right </div>
```

> If the image are irrelevant for page content, `alt` can
> be empty (`alt=" "`).

8. Avoid use `-` in commentaries, use other characters.

``` html
<!-- wrong -->
<!-- ---------- -->

<!-- right -->
<!-- ========== -->
<!-- xxxxxxxxxx -->
```

9. Use the encoded version of `&`.

``` html
<p> & wrong </p>

<p> &amp; right </p>
```

10. Personalized attributes must be prefixed by `data-`.

```  html
<div foo="0"> wrong </div>

<div data-foo="0"> wrong </div>
```

11. *cobol-case* must be used for `id` and `class` values.

``` html
<span class="foo_span"> wrong </span>

<span class="foo-span"> right </span>
```

12. `id` must be used only to allow that the JS identify specific elements.

``` html
<!-- wrong -->
<li id="item-57"></li>
<li id="item-58"></li>
<li id="item-59"></li>

<!-- right -->
<button id="close-foo-panel"></button>
```

13. Avoid multiple consective hyphen in property values.

``` html
<div class="hi--foo"> wrong </div>

<div class="hi-foo"> right </div>
```

## CSS

1. Style rules must be generic, then any way of to make some rule most specific is allowed.

``` css
/* wrong */
div#foo {}
div > .foo {}
ul.foo-list > li {}

/* right */ {}
.foo {}
.foo-container .foo {}
.foo-list li {}
```

2. Different *versions* of similar elements must receive classes with one, or more, of the
prefixes below (combination of prefixed must be sorted in alphabetic order):

* `co`(ntainer): element created only to contain one (or more) element. Generally it need
any style to make its *job*.

* `gr`(oup): for similar elements that are used by JS for something.

* `hi`(ghlight): highlight version of an element that it belong to a group of similar
elements.

* `sc`(ope): container, without (or with minimum) style, created only to store style
variables.

> #### Example
> 
> ``` css
> .hi-foo {}
> .co-hi-foo {}
> ```

3. Color variables must follow the rules below:

* They must be named in this structure: `--color-<target>`.
* They must be declared in `root` element (in `./css/colors.css`).
* They must have two shades: light and dark.
* They must have a JS *version* (in `./javascript/colors.js`).

> #### Example
> 
> ``` css
> :root {
> 	--color-body-background: #cfcfcf;
> }
> 
> @media (prefers-color-scheme: dark){
> 	:root {
> 		--color-body-background: #333;
>	 }
> }
> ```

4. Variable do not destined to store color must follow the rules above:

* They must be declared only if their values are required by more one style rule.
* They must be declared in the lower container (in `./css/variables.css`).
* Their names must be much descriptive.
* Their names must be prefixed by *class prefixes* (see more about in CSS#**2**)

> #### Example
> 
> ``` css
> .foo {
> 	--foo-item-width: 50px;
> }
> 
> @media only screen and (min-width: 200px){
> 	.foo {
> 		--foo-item-width: 80px;
> 	}
> }
> ```

## JS

1. The identifiers must follow the *case styles* below:  

| *Case Style*           | Identifier types                         |
| :-:                    | :--                                      |
| `camelCase`            | variables; enums; properties; parameters |
| `PascalCase`           | classes; global objects; global arrays   |
| `snake_case`           | functions; methods, local constants      |
| `SCREAMING_SCAKE_CASE` | global constants                         |

> To easy differentiation between `camelCase` and `snake_case`, use on minimum two
> words to compound `snake_case` identifiers.

> [!NOTE]
> `snake_case` must not be to apply for *getters* and *setters*, instead it, use `camelCase`.

2. Function must be declared like *arrow function* and they must be attributed to
constants, instead use `function` keyword.

``` js
function wrong(){}

const right = () => {}
```

> Even that functions (technically) are constants, they will be treated like functions.

3. All global identifier must be constants and they must be declared in
`./javascript/contants.js`.

``` js
let wrong = 10;

const RIGHT = 10;
```

4. `var` must not be used.

``` js
var wrong = 0;

let right = 0;
```

5. The strict mode must be used in **all** JS files.

``` js
"use strict"; // first line of all script
```

6. Use *private*, *getters* and *setters* in classes.

``` js
class Wrong {
	foo = 0;
	
	constructor(foo){
		this.foo = foo;
	}
}

class Right {
	#foo = 0;
	
	constructor(foo){
		this.#foo = foo;
	}
	
	getFoo(){
		return this.#foo;
	}
	
	setFoo(foo){
		this.#foo = foo;
	}
}
```

> [!IMPORTANT]
> Do not use keywords `get` and `set` to create *getters* and *setters*, use the
> prefixes `get` and `set`.
>
> ``` js
> get foo(){ return this.#_foo; } // wrong
>
> getFoo(){ return this.#foo; } // right
> ```

7. Class variables (properties) must be declared outside *constructors*.

``` js
class Wrong {
	constructor(foo){
		this.foo = foo;
	}
}

class Right {
	foo;
	
	constructor(foo){
		this.foo = foo;
	}
}
```

8. `this.` must be used like prefix in all use of class properties, in its scope.

``` js
class Wrong {
	foo;
	
	increment_with_foo(n){
		return foo + n;
	}
}

class Right {
	foo;
	
	increment_with_foo(n){
		return this.foo + n;
	}
}
```

> For private properties this is mandatory.

9. Use semicolon, based C pattern.

``` js
let wrong = 0

let right = 0;
```

10. All scripts, except `./javascript/constants.js`, must have themselves local scope.

``` js
"use strict";

let wrong = 0;
```

``` js
"use strict";
{

let wrong = 0;

}
```

> Use `// start` and `// end` to explicit the use of these curly braces.
>
> ``` js
> "use strict";
> { // start
>
> } // end
> ```

> In this case, indentation is not necessary (please do not use).
