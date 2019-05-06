# pHTML Image Size [<img src="https://phtml.io/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[pHTML Image Size] lets you automatically add image size attributes in HTML.

```html
<img src="image-600x400.jpg">

<!-- becomes -->

<img src="image-600x400.jpg" width="600" height="400" intrinsicsize="600x400">
```

## Usage

Transform HTML files directly from the command line:

```bash
npx phtml source.html output.html -p @phtml/image-size
```

### Node

Add [pHTML Image Size] to your project:

```bash
npm install @phtml/image-size --save-dev
```

Use [pHTML Image Size] to process your HTML:

```js
const phtmlImageSize = require('@phtml/image-size');

phtmlImageSize.process(YOUR_HTML /*, processOptions, pluginOptions */);
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml');
const phtmlImageSize = require('@phtml/image-size');

phtml([
  phtmlImageSize(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */);
```

[pHTML Image Size] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [CLI](INSTALL.md#phtml-cli) | [Eleventy](INSTALL.md#eleventy) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- |

## Options

### size

The `size` option determines how `width` and `height` attributes are handled.
By default, the option is set to `"auto"`.

#### size: auto

When `size` is `"auto"`, images with both `width` and `height` attributes set
as something other than `auto` will be ignored.

```html
<img src="image-600x400.jpg" width="600" height="400">
<!-- becomes -->
<img src="image-600x400.jpg" width="600" height="400">
```

Then, images with only one `width` or `height` attribute set as something other
than `auto` will have their corresponding attribute set with the corresponding
aspect ratio.

```html
<img src="image-600x400.jpg" height="200">
<img src="image-600x400.jpg" width="1200" height="auto">
<!-- becomes -->
<img src="image-600x400.jpg" width="300" height="200">
<img src="image-600x400.jpg" width="1200" height="800">
```

Then, images with both `width` or `height` attributes missing or set as `auto`
will have both attributes set with the image original size.

```html
<img src="image-600x400.jpg">
<!-- becomes -->
<img src="image-600x400.jpg" width="600" height="400">
```

#### size: intrinsic

When `size` is `"intrinsic"`, images will always have their `width` and
`height` attributes set with the intrinsic size of the image.

```html
<!-- when { size: "intrinsic" } -->
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" width="300">
<img src="image-600x400.jpg" width="1200" height="auto">
<!-- becomes -->
<img src="image-600x400.jpg" width="600" height="400">
<img src="image-600x400.jpg" width="600" height="400">
<img src="image-600x400.jpg" width="600" height="400">
```

#### size: remove

When `size` is `"remove"`, all `width` and `height` attributes are removed.

```html
<!-- when { size: "remove" } -->
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" width="300">
<img src="image-600x400.jpg" width="1200" height="auto">
<!-- becomes -->
<img src="image-600x400.jpg">
<img src="image-600x400.jpg">
<img src="image-600x400.jpg">
```

#### size: ignore

When `size` is `"ignore"`, all `width` and `height` attributes are ignored.

```html
<!-- when { size: "ignore" } -->
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" width="300">
<img src="image-600x400.jpg" width="1200" height="auto">
<!-- becomes -->
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" width="300">
<img src="image-600x400.jpg" width="1200" height="auto">
```

### intrinsicsize

The `intrinsicsize` option determines how the `intrinsicsize` attribute is
handled. By default, the option is set to `"auto"`.

#### intrinsicsize: auto

When `intrinsicsize` is `"auto"`, images with a missing `intrinsicsize`
attribute will have it added.

```html
<img src="image-600x400.jpg">
<!-- becomes -->
<img src="image-600x400.jpg" intrinsicsize="600x400">
```

#### intrinsicsize: intrinsic

When `intrinsicsize` is `"intrinsic"`, images will always have their
`intrinsicsize` attribute set with the intrinsic size of the image.

```html
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" intrinsicsize="300x200">
<!-- becomes -->
<img src="image-600x400.jpg" intrinsicsize="600x400">
<img src="image-600x400.jpg" intrinsicsize="600x400">
```

#### intrinsicsize: remove

When `intrinsicsize` is `"remove"`, the `intrinsicsize` attribute is removed.

```html
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" intrinsicsize="600x400">
<!-- becomes -->
<img src="image-600x400.jpg">
<img src="image-600x400.jpg">
```

#### intrinsicsize: ignore

When `intrinsicsize` is `"ignore"`, the `intrinsicsize` attribute is ignored.

```html
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" intrinsicsize="600x400">
<!-- becomes -->
<img src="image-600x400.jpg">
<img src="image-600x400.jpg" intrinsicsize="600x400">
```

### path

The `path` option determines the path or paths used to resolve image sources.
By default, images are resolved relative to the path of their HTML file.

```html
<!-- resolved as `/path/to/image-600x400.jpg` within `path/to/index.html` -->
<img src="image-600x400.jpg">
```

```html
<!-- when { path: '/another/path' } -->
<!-- resolved as `/another/path/image-600x400.jpg`, or -->
<!-- resolved as `/path/to/image-600x400.jpg` within `path/to/index.html` -->
<img src="image-600x400.jpg">
```

Image sources resolve in the order they are specified.

```html
<!-- when { path: ['/another/path', '/and/another'] } -->
<!-- resolved as `/another/path/image-600x400.jpg`, or -->
<!-- resolved as `/and/another/image-600x400.jpg`, or -->
<!-- resolved as `/path/to/image-600x400.jpg` within `path/to/index.html` -->
<img src="image-600x400.jpg">
```

[cli-img]: https://img.shields.io/travis/phtmlorg/phtml-image-size.svg
[cli-url]: https://travis-ci.org/phtmlorg/phtml-image-size
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/@phtml/image-size.svg
[npm-url]: https://www.npmjs.com/package/@phtml/image-size

[pHTML]: https://github.com/phtmlorg/phtml
[pHTML Image Size]: https://github.com/phtmlorg/phtml-image-size
