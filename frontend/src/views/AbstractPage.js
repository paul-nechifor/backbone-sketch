import Backbone from 'backbone';

export default Backbone.View.extend({
    initialize(opts) {
        this.app = opts.app;
        this.data = opts.data || null;
    },
});
