import Backbone from 'backbone';

export default Backbone.Router.extend({
    routes: {
        ['']() {
            this.app.homepage();
        },
        about() {
            this.app.about();
        },
    },

    initialize(opts) {
        this.app = opts.app;
    },
});
