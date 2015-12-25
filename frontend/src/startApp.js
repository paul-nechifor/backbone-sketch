import App from './views/App';
import $ from 'jquery';
import appModel from './data/appModel';

export default cb => {
    window.$ = window.jQuery = $; // This is needed by Bootstrap.

    $(() => {
        const app = new App({model: appModel});
        app.start();
        if (cb) {
            return cb(app);
        }
    });
};
