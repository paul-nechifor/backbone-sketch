import Backbone from 'backbone';
import views from './views';

export default Backbone.Router.extend({
    routes: {
        ['']() {
            this.app.replaceView(views.HomePage);
        },
        about() {
            this.app.replaceView(views.AboutPage);
        },
        logout() {
            this.app.user.logOut();
        },
        ['sign-up-in']() {
            this.app.replaceView(views.SignUpInPage);
        },
        ['*other']() {
            this.app.replaceView(views.NotFoundPage, arguments);
        },
    },

    initialize(opts) {
        this.app = opts.app;
    },
});
