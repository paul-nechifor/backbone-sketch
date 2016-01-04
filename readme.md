# Backbone Sketch

This is an example frontend JavaScript project that integrates the following:

   * babel: converts JavaScript 2015 to JavaScript 5
   * backbone: an MV\* framework
   * bootstrap: a frontend framework
   * bower: a package manager for the frontend
   * chai: for its 'should' BDD assertion library
   * eslint: for linting the JavaScript 2015 code
   * gulp: a build system
   * istanbul: instruments JS code for coverage
   * karma: runs the Mocha tests inside a browser
   * mocha: the test framework
   * phantomjs: the browser used for unit tests
   * uglify: for minifying the bundle
   * webpack: bundles and transforms static assets

Left to integrate:

   * sinon
   * stylus

## Usage

You can install the requirements with the following command. Note that you will
need more than 1 GiB of RAM to compile/install everything. This will also
install the bower requirements.

    npm install

Lint, test and generate the coverage:

    npm test

Rebuild all the files and start the app.

    npm start

Rebuild all the files without starting the app.

    npm run build

Delete all generated files:

    npm run clean

## Other

By default, both `test` and `start` fail if linting doesn't pass. To skip that
use the `nofail` environment variable like this:

    nofail=1 npm test

## License

MIT
