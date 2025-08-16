# The Markdown Debugger

This is the debugging page for Markdown containing a lot of elements, components, and complexity.

<!-- this is a comment -->

## Heading of Depth 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt nulla nulla, eu mattis dolor pretium vehicula. Morbi urna dui, imperdiet non consequat quis, placerat vel orci. Integer luctus ligula odio, eget consequat urna imperdiet a. Suspendisse pulvinar neque ut hendrerit sollicitudin.

Integer dapibus nisl auctor tristique semper. Donec non tellus tempus, bibendum ligula nec, elementum nisi. Duis ultricies ex mollis justo efficitur aliquam. Curabitur dignissim vehicula libero, non volutpat magna mollis nec. Aenean faucibus arcu eros, eget condimentum nulla condimentum feugiat. Nunc pretium convallis lacus ac mollis. Sed nec ex consequat, semper est sed, dignissim metus. Quisque aliquam orci elit, eget tincidunt orci finibus ut.

### Heading of Depth 3

In at justo pellentesque, vehicula metus at, fermentum augue. Sed euismod sed velit nec lobortis. Vestibulum diam nunc, vestibulum at eros a, luctus dapibus nunc. Etiam quis tortor sed lacus varius ultrices vitae rutrum eros. Donec interdum dictum justo, eget facilisis massa volutpat luctus. Pellentesque imperdiet ligula nisl, non fermentum nisi posuere scelerisque. Integer quis volutpat est, non accumsan ligula.

Suspendisse potenti. Aenean in ornare velit. Nam a justo aliquet, tempor augue sollicitudin, ultricies ex. In lectus erat, luctus nec est in, sodales venenatis magna. Nam euismod ac magna non convallis. Donec sit amet aliquam erat. Quisque imperdiet est nulla, et semper velit molestie a. Vestibulum sed nulla a neque molestie tristique. Pellentesque et malesuada nisl. Praesent sodales odio a nisi malesuada, et elementum massa scelerisque. Sed a lobortis purus.

$$
\Gamma = \oint_C V \cdot ds
$$

Suspendisse potenti. Aenean in ornare velit. Nam a justo aliquet, tempor augue sollicitudin, ultricies ex. In lectus erat, luctus nec est in, sodales venenatis magna. Nam euismod ac magna non convallis.

$$
\begin{align*}

\Gamma_A &= \int_\text{bottom} u(-a/2) \hat{i} \cdot \hat{i} ~ dx + \int_\text{right} u(y) \cancel{\hat{i} \cdot \hat{j}} ~ dy + \int_\text{top} u(a/2) \hat{i} \cdot -\hat{i} ~ dx + \int_\text{left} u(y) \cancel{\hat{i} \cdot -\hat{j}} ~ dy

\\

&= \int_0^a u(-a/2) dx - \int_0^a u(a/2) dx

\\

&= \int_0^a U_m - \frac{U_m}{H^2}(-a/2)^2 dx - \int_0^a U_m - \frac{U_m}{H^2}(a/2)^2 dx

\\

&= \cancel{\int_0^a U_m - \frac{U_m a^2}{4 H^2} dx} - \cancel{\int_0^a U_m - \frac{U_m a^2}{4 H^2} dx}

\\

&= \boxed{0}

\end{align*}
$$

Suspendisse potenti. Aenean in ornare velit. Nam a justo aliquet, tempor augue sollicitudin, ultricies ex. In lectus erat, luctus nec est in, sodales venenatis magna. Nam euismod ac magna non convallis.

$$
\begin{align*}

\Gamma_B &= \int_\text{bottom} u(0) \hat{i} \cdot \hat{i} ~ dx + \int_\text{right} u(y) \cancel{\hat{i} \cdot \hat{j}} ~ dy + \int_\text{top} u(a) \hat{i} \cdot -\hat{i} ~ dx + \int_\text{left} u(y) \cancel{\hat{i} \cdot -\hat{j}} ~ dy

\\

&= \int_0^a u(0) dx - \int_0^a u(a) dx

\\

&= u(0) \int_0^a dx - u(a) \int_0^a dx

\\

&= u(0) a - u(a) a

\\

&= a U_m - \cancel{\frac{a U_m}{H^2} \cdot 0^2} - (a U_m - \frac{a U_m}{H^2}a^2)

\\

&= \cancel{a U_m} - \cancel{a U_m} + \frac{a U_m}{H^2}a^2

\\

&= \boxed{-\frac{a^3 U_m}{H^2}}


\end{align*}
$$

In bibendum justo et quam blandit lacinia. Aliquam tristique $\frac{2\pi}{3}$ ligula odio, eget lacinia elit hendrerit id. Maecenas sollicitudin molestie rutrum. Donec vel dapibus dolor. Duis lacinia augue non cursus dignissim. Sed sit amet dignissim nisl. Donec sed metus pretium, sollicitudin lacus sit amet, euismod nunc. Phasellus turpis mauris, feugiat quis malesuada in, pretium eget lorem. Nam arcu orci, elementum nec magna porttitor, porta vulputate sem.

### Another Heading of Depth 3

Donec quam tellus, dictum eu luctus ut, tristique a nisl. Mauris faucibus purus turpis. Donec ullamcorper urna in leo aliquet congue finibus at erat. Morbi eget consequat dui, quis volutpat ipsum. Phasellus enim leo, dapibus eu elementum nec, dictum vel erat. Proin in blandit ante. Duis non nisl a nisl euismod pellentesque.

## Code Stuff

A code block:

```ts
import { ReadStream } from "./buffer";

export class WindowsReadStream extends ReadStream {
  dword() {
    return this.uint32();
  }
}
```

This paragraph has a lot of in-line code:

Donec quam tellus, dictum eu luctus ut, `tristique` a nisl. Mauris faucibus purus turpis. Donec ullamcorper urna in leo aliquet congue finibus at erat. Morbi eget `consequat` dui, quis volutpat ipsum. Phasellus enim leo, `dapibus-eu` elementum nec, dictum vel erat. Proin in blandit ante. Duis non nisl a nisl euismod pellentesque.

## 🖼️ Images!

Suspendisse potenti. Aenean in ornare velit. Nam a justo aliquet, tempor augue sollicitudin, ultricies ex. In lectus erat, luctus nec est in, sodales venenatis magna. Nam euismod ac magna non convallis. Donec sit amet aliquam erat. Quisque imperdiet est nulla, et semper velit molestie a. Vestibulum sed nulla a neque molestie tristique. Pellentesque et malesuada nisl. Praesent sodales odio a nisi malesuada, et elementum massa scelerisque. Sed a lobortis purus.

In bibendum justo et quam blandit lacinia. Aliquam tristique ligula odio, eget lacinia elit hendrerit id. Maecenas sollicitudin molestie rutrum. Donec vel dapibus dolor. Duis lacinia augue non cursus dignissim. Sed sit amet dignissim nisl. Donec sed metus pretium, sollicitudin lacus sit amet, euismod nunc. Phasellus turpis mauris, feugiat quis malesuada in, pretium eget lorem. Nam arcu orci, elementum nec magna porttitor, porta vulputate sem.

![A crazy GTA Online character sneaking around in the swamps of San Andreas, north of Los Santos.](https://i.imgur.com/YaPBn9g.jpeg)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt nulla nulla, eu mattis dolor pretium vehicula. Morbi urna dui, imperdiet non consequat quis, placerat vel orci. Integer luctus ligula odio, eget consequat urna imperdiet a. Suspendisse pulvinar neque ut hendrerit sollicitudin.

Integer dapibus nisl auctor tristique semper. Donec non tellus tempus, bibendum ligula nec, elementum nisi. Duis ultricies ex mollis justo efficitur aliquam. Curabitur dignissim vehicula libero, non volutpat magna mollis nec. Aenean faucibus arcu eros, eget condimentum nulla condimentum feugiat. Nunc pretium convallis lacus ac mollis. Sed nec ex consequat, semper est sed, dignissim metus. Quisque aliquam orci elit, eget tincidunt orci finibus ut.

And this is an image of my Minecraft World as of 7/20/2025, but without alt text:

![](https://i.imgur.com/6o6iLAf.jpeg)

Donec quam tellus, dictum eu luctus ut, tristique a nisl. Mauris faucibus purus turpis. Donec ullamcorper urna in leo aliquet congue finibus at erat. Morbi eget consequat dui, quis volutpat ipsum. Phasellus enim leo, dapibus eu elementum nec, dictum vel erat. Proin in blandit ante. Duis non nisl a nisl euismod pellentesque.

![A classic tortion loading problem from Mechanics of Materials.](https://i.imgur.com/lU9W2Hnm.png)

## Tables?

TODO
