import Backbone from 'backbone';

export default Backbone.View.extend({
    initialize(options) {
        const opts = options || {};
        this.app = opts.app;
        this.data = opts.data || null;
    },
});
