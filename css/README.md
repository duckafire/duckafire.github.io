## CSS conventions

* [Classes prefix](#classes-prefix)
* [Pseudo-classes](#pseudo-classes)
* [Elements prefix](#elements-prefix)
* [Global variables](#global-variables)

### Classes prefix

1. `co(ntainer)`: representate elements that they are used only like container. Generally
it contains none or a little of style.

1. `gr(oup)`: set of elements that will be manipuled by JS.

1. `hi(ghlight)`: indicate that an element is a highlight version of a existent element.
Generally it contains a summary of original element content

1. `me(asure)`: containers the same dimensions of an existent element. It is used like
"weither" to some elements with `position: absolute` (like ".main-nav").

1. `ta(rget)`: used to containers that will receive elements from JS. It is single in code.

1. `small`|`medium`|`big`: applied to separate animations based in element size. They are
used mainlly in CSS pseudo-classes.

> [!IMPORTANT]
> Between the prefix and the class name there must be **two** hyphens.

> [!NOTE]
> The order that they can be shown is based on alphabetic order, and their length (minor to
major).

#### Pseudo-classes

Specific classes must be created to contain style to pseudo-class "events". They must start
with the pseudo-class name (like: `.hover-foo`). They must contain **only** one pseudo-class.

> #### Example
>
> ``` html
> <i class="hover-icon active-icon"></i>
> ```
>
> ``` css
> .hover-icon { /* ... */ }
> 
> .active-icon { /* ... */ }
> ```

#### Elements prefix

All rules blocks must be prefixed by `body` child that containing them.

> #### Example
>
> ``` html
> <body>
> 	<main>
> 		<section class="foo">
> 			<h1 class="foo-title">Foo</h1>
> 		</section>
> 	</main>
> </body>
> ```
>
> ``` css
> main .foo-title { /* ... */ }
> ```

#### Global variables

Values used by more that one rule, in one or multiple elements, must be stored in a
CSS variable. They follow the following rules:

1. They must be declared on `root` scope.
2. They must be prefixed by `body` child that containing them (or *generic*).
3. If the target has a [*Classes prefix*](#classes-prefix), it must be added too.
4. A reference for the target element must be present on their name.
5. A reference for the stored value must be present on their name.
6. Between the different identifier "chunks" there must be `--`.

* There are three types of variables, they are:

	* **Color variables**: store only color codes. They are present in `./css/colors.css`.
	They must be prefixed (before the 2nd rule) by `color`. They must have two variants:
	light and dark.
	
	* **General variables**: store any value, except color codes. They are present in
	`./css/variables.css`. They can have a different values for different layout.
	
	* **Calculus variables**: store values that will be used to set values for *general
	variables*. They are used **only** in the rules blocks that are used to declare
	*general variables* (in `./css/variables.css`). They must be prefixed by `calc`. They
	can have a different values for different layout.
		
> #### Example:
> 
> * `--color--main--card-title--font-size`
> * `--color--aside--co-hi--list--height`
> * `--section--content-grid--columns-quantity`
> * `--calc--dialog--trophy--width`

