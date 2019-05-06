# Installing pHTML Image Size

[pHTML Image Size] runs in all Node environments, with special instructions for:

| [Node](#node) | [CLI](#phtml-cli) | [Eleventy](#eleventy) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- |

## Node

Add [pHTML Image Size] to your project:

```bash
npm install @phtml/image-size --save-dev
```

Use [pHTML Image Size] to process your HTML:

```js
const phtmlImageSize = require('@phtml/image-size')

phtmlImageSize.process(YOUR_HTML /*, processOptions, pluginOptions */)
```

Or use it as a [pHTML] plugin:

```js
const phtml = require('phtml')
const phtmlImageSize = require('@phtml/image-size')

phtml([
  phtmlImageSize(/* pluginOptions */)
]).process(YOUR_HTML /*, processOptions */)
```

## CLI

Transform HTML files directly from the command line:

```bash
npx phtml source.html output.html -p @phtml/image-size
```

Alternatively, add [pHTML Image Size] to your `phtml.config.js` configuration file:

```js
module.exports = {
  plugins: [
    ['@phtml/image-size', /* pluginOptions */]
  ]
}
```

## Eleventy

Add [pHTML Eleventy] and [pHTML Image Size] to your Eleventy project:

```sh
npm install @phtml/image-size @phtml/11ty --save-dev
```

Use [pHTML Eleventy] and [pHTML Image Size] in your Eleventy configuration:

```js
const phtml11ty = require('@phtml/11ty')
const phtmlImageSize = require('@phtml/image-size')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(phtml11ty, {
    use: [
      phtmlImageSize(/* pluginOptions */)
    ]
  })
}
```

## Gulp

Add [Gulp pHTML] and [pHTML Image Size] to your project:

```bash
npm install @phtml/image-size gulp-phtml --save-dev
```

Use [Gulp pHTML] and [pHTML Image Size] in your Gulpfile:

```js
const gulp = require('gulp')
const gulpPhtml = require('gulp-phtml')
const phtmlImageSize = require('@phtml/image-size')

gulp.task('html',
  () => gulp.src('./src/*.html').pipe(
    gulpPhtml({
      plugins: [
        phtmlImageSize(/* pluginOptions */)
      ]
    })
  ).pipe(
    gulp.dest('dist')
  )
)
```

## Grunt

Add [Grunt pHTML] to your project:

```bash
npm install grunt-phtml --save-dev
```

Use [Grunt pHTML] and [pHTML Image Size] in your Gruntfile:

```js
const phtmlImageSize = require('@phtml/image-size')

grunt.loadNpmTasks('grunt-phtml')

grunt.initConfig({
  phtml: {
    options: {
      plugins: [
        phtmlImageSize(/* pluginOptions */)
      ]
    },
    dist: {
      files: [{
        expand: true,
        src: 'src/*.html',
        dest: 'dest'
      }]
    }
  }
})
```

[Gulp pHTML]: https://github.com/phtmlorg/gulp-phtml
[Grunt pHTML]: https://github.com/phtmlorg/grunt-phtml
[pHTML]: https://github.com/phtmlorg/phtml
[pHTML Eleventy]: https://github.com/phtmlorg/phtml-11ty
[pHTML Image Size]: https://github.com/phtmlorg/phtml-image-size
