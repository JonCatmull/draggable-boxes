# Draggable Boxes

Draggable Boxes is JavaScript plugin for creation and manipulation of draggable boxes

### Technologies and Plugins

Draggable Boxes uses a number of open source Node modules for development:

* [Gulp](https://gulpjs.com/) - Development task automation tool. Gulp plugins used [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer), [gulp-babel](https://github.com/babel/gulp-babel), [gulp-clean-css](https://github.com/scniro/gulp-clean-css), [gulp-concat](https://github.com/contra/gulp-concat), [gulp-rename](https://github.com/hparra/gulp-rename), [gulp-sass](https://github.com/dlmanning/gulp-sass), [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps), [gulp-uglify](https://github.com/terinjokes/gulp-uglify).
* [Babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) - Babel compiler core
* [Babel Preset ES2015](https://www.npmjs.com/package/babel-preset-es2015) - Babel preset for all es2015 plugins
* [Browser Sync](https://www.browsersync.io/) - Time-saving synchronised browser testing
* [Del](https://www.npmjs.com/package/del) - Delete files and folders using globs
* [JSDoc 3](https://github.com/jsdoc3/jsdoc) - An API documentation generator for JavaScript
* [Docdash](https://github.com/clenemt/docdash) - Lodash inspired JSDoc 3 template/theme

### Example page
Draggable Boxes example page [here](https://smoockpp.github.io/draggable-boxes/dist/).

### Documentation
Draggable Boxes documentation [here](https://smoockpp.github.io/draggable-boxes/out/).

### Installation

Draggable Boxes in development requires [Node.js](https://nodejs.org/) v4+ to run.

Clone and install the dependencies and devDependencies from [Draggable Boxes](https://github.com/smoockpp/draggable-boxes) repo.

```sh
$ git clone https://github.com/smoockpp/draggable-boxes.git
$ cd draggable-boxes
$ npm install
```

Draggable Boxes uses Gulp for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run this command within the project directory to start watching for file changes.

```sh
$ gulp serve
```
Now you can see the server running at http://localhost:3000. Will be listening for changes in files

To generate documentation run this command within the project directory
```sh
$ jsdoc src/js/babel/Boxes.js ./README.md -t node_modules/docdash/
```



### Todos

 - Implement Tests

License
----

MIT

