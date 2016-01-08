import App from './views/App';
import $ from 'jquery';

export default cb => {
    window.$ = window.jQuery = $; // This is needed by Bootstrap.

    $(() => {
        const app = new App();
        app.start();
        if (cb) {
            return cb(app);
        }
    });
};
