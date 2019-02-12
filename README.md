# pHTML Image Size [<img src="https://phtmlorg.github.io/phtml/logo.svg" alt="pHTML" width="90" height="90" align="right">][phtml]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[pHTML Image Size] lets you automatically add image size attributes in HTML.

```html
<img src="image-600x400.jpg">

<!-- becomes -->

<img src="image-600x400.jpg" width="600" height="400">
```

## Usage

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

| [Node](INSTALL.md#node) | [pHTML CLI](INSTALL.md#phtml-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

### override

The `override` option determines whether images with existing `width` and
`height` attributes will be overwritten. By default, images with either
attribute are ignored.

```js
phtmlImageSize({ override: true });
```

```html
<img src="image-600x400.jpg" width="300">

<!-- becomes -->

<img src="image-600x400.jpg" width="600" height="400">
```

If `override` receives an `auto` value, it will attempt to replace missing or
`auto` values in images, taking existing width or height values into account.

```js
phtmlImageSize({ override: 'auto' });
```

```html
<img src="image-600x400.jpg" width="300">
<img src="image-600x400.jpg" width="1200" height="auto">

<!-- becomes -->

<img src="image-600x400.jpg" width="300" height="200">
<img src="image-600x400.jpg" width="1200" height="800">
```

[cli-img]: https://img.shields.io/travis/phtmlorg/phtml-image-size.svg
[cli-url]: https://travis-ci.org/phtmlorg/phtml-image-size
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/phtmlorg/phtml
[npm-img]: https://img.shields.io/npm/v/@phtml/image-size.svg
[npm-url]: https://www.npmjs.com/package/@phtml/image-size

[pHTML]: https://github.com/phtmlorg/phtml
[pHTML Image Size]: https://github.com/phtmlorg/phtml-image-size
