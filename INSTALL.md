# Installing pHTML Image Size

[pHTML Image Size] runs in all Node environments, with special instructions for:

| [Node](#node) | [pHTML CLI](#phtml-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

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

## pHTML CLI

Add [pHTML CLI] to your project:

```bash
npm install phtml-cli --save-dev
```

Use [pHTML Image Size] in your `phtml.config.js` configuration file:

```js
const phtmlImageSize = require('@phtml/image-size');

module.exports = {
  plugins: [
    phtmlImageSize(/* pluginOptions */)
  ]
}
```

## Webpack

Add [pHTML Loader] to your project:

```bash
npm install phtml-loader --save-dev
```

Use [pHTML Image Size] in your Webpack configuration:

```js
const phtmlImageSize = require('@phtml/image-size');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'style-loader',
          { loader: 'html-loader', options: { importLoaders: 1 } },
          { loader: 'phtml-loader', options: {
            ident: 'phtml',
            plugins: () => [
              phtmlImageSize(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}
```

## Create React App

Add [React App Rewired] and [React App Rewire pHTML] to your project:

```bash
npm install react-app-rewired react-app-rewire-html --save-dev
```

Use [React App Rewire pHTML] and [pHTML Image Size] in your
`config-overrides.js` file:

```js
const reactAppRewirePHTML = require('react-app-rewire-phtml');
const phtmlImageSize = require('@phtml/image-size');

module.exports = config => reactAppRewirePHTML(config, {
  plugins: () => [
    phtmlImageSize(/* pluginOptions */)
  ]
});
```

## Gulp

Add [Gulp pHTML] to your project:

```bash
npm install gulp-phtml --save-dev
```

Use [pHTML Image Size] in your Gulpfile:

```js
const phtml = require('gulp-phtml');
const phtmlImageSize = require('@phtml/image-size');

gulp.task('html', () => gulp.src('./src/*.html').pipe(
  phtml([
    phtmlImageSize(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt pHTML] to your project:

```bash
npm install grunt-phtml --save-dev
```

Use [pHTML Image Size] in your Gruntfile:

```js
const phtmlImageSize = require('@phtml/image-size');

grunt.loadNpmTasks('grunt-phtml');

grunt.initConfig({
  phtml: {
    options: {
      use: [
       phtmlImageSize(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.html'
    }
  }
});
```

[Gulp pHTML]: https://github.com/phtmlorg/gulp-phtml
[Grunt pHTML]: https://github.com/phtmlorg/grunt-phtml
[pHTML]: https://github.com/phtmlorg/phtml
[pHTML CLI]: https://github.com/phtmlorg/phtml-cli
[pHTML Loader]: https://github.com/phtmlorg/phtml-loader
[pHTML Image Size]: https://github.com/phtmlorg/phtml-image-size
[React App Rewire pHTML]: https://github.com/phtmlorg/react-app-rewire-phtml
[React App Rewired]: https://github.com/timarney/react-app-rewired
