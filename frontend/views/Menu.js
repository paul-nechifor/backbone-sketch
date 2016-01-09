import $ from 'jquery';
import AbstractPage from './AbstractPage';

require('./Menu.styl');

export default AbstractPage.extend({
    template: require('./Menu.jade'),

    initialize() {
        AbstractPage.prototype.initialize.apply(this, arguments);
        this.links = {};
        this.previous = null;
        this.app.user.on('change:loggedIn', this.onLoggedInChange, this);
    },

    render() {
        this.$el.html(this.template(this.app.user.attributes));
        this.load();
        return this;
    },

    load() {
        const that = this;
        this.$el.find('a.activatable').map(function () {
            const jEl = $(this);
            that.links[jEl.attr('href')] = jEl;
        });
    },

    lookUp(url) {
        if (this.previous) {
            this.previous.removeClass('active');
        }
        const el = this.links[url];
        if (el) {
            this.previous = el.parent();
            this.previous.addClass('active');
        } else {
            this.previous = null;
        }
    },

    onLoggedInChange() {
        this.render();
    },
});
