require('js-polyfills/es5');
const testsContext = require.context('.', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
