import Backbone from 'backbone';
import $ from 'jquery';

require('./PaginatorPane.styl');

export default Backbone.View.extend({
    template: require('./PaginatorPane.jade'),

    initialize(opts) {
        Backbone.View.prototype.initialize.apply(this, arguments);
        this.urlPrefix = opts.urlPrefix;
        this.onPageChange = opts.onPageChange;
        this.hijackLinks();
    },

    hijackLinks() {
        const that = this;
        this.$el.on('click', 'a[href]', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            const page = Number($(this).data('page'));
            if (page >= 1 && that.onPageChange) {
                that.onPageChange(Number($(this).data('page')));
            }
        });
    },

    render(nPages, active) {
        this.$el.html(this.template(this.getPaginatorData(nPages, active)));
    },

    getPaginatorData(nPages, active) {
        const ret = [];

        if (active === 1) {
            ret.push({text: '«', classes: 'disabled'});
        } else {
            ret.push({
                text: '«',
                page: active - 1,
                url: `${this.urlPrefix}/${active - 1}`,
            });
        }

        for (let i = 1; i <= nPages; i++) {
            ret.push({
                text: `${i}`,
                page: i,
                url: `${this.urlPrefix}/${i}`,
            });
        }

        ret[active].classes = 'active';

        if (active === nPages) {
            ret.push({text: '»', classes: 'disabled'});
        } else {
            ret.push({
                text: '»',
                page: active + 1,
                url: `${this.urlPrefix}/${active + 1}`,
            });
        }

        return ret;
    },
});
