## CSS conventions

### Classes prefix

1. `co(ntainer)`: representate elements that they are used only like container. Generally
it contains none or a little of style.

2. `gr(oup)`: used to containers that will receive elements from DOM. It is single in code.

3. `hi(ghlight)`: indicate that an element is a highlight version of a existent element.
Generally it contains a summary of original element content

4. `me(asure)`: containers the same dimensions of an existent element. It is used like
"weither" to some elements with `position: absolute` (like ".main-nav").

5. `small`|`medium`|`big`: applied to separate animations based in element size. They are
used mainlly in CSS pseudo-classes.

> [!IMPORTANT]
> Between the prefix and the class name there must be **two** hyphens.

> [!NOTE]
> The order that they can be shown is based on alfabetic order, and their length (minor to
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

#### Element prefix

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
