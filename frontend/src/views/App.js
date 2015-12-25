import $ from 'jquery';
import Backbone from 'backbone';
import Router from '../Router';
import templates from '../../../build/templates';

export default Backbone.View.extend({
    initialize() {
        this.router = new Router({app: this});
        this.templates = templates;
        this.content = null;
        this.currentView = null;
    },

    start() {
        $('body').html(`
            <div id="app"></div>
            <script src='/bower/bootstrap/dist/js/bootstrap.min.js'></script>
        `);
        const app = $('#app');
        app.html(this.templates.app(this.model));
        this.content = app.find('.content');
        if (!Backbone.History.started) {
            Backbone.history.start({pushState: true, root: '/'});
        }
        this.hijackLinks();
    },

    hijackLinks() {
        const that = this;

        $(document).on('click', 'a[href]', function (e) {
            const a = $(this);
            const href = a.attr('href');
            if (href[0] === '/') {
                e.preventDefault();
                that.navigate(href);
            }
        });
    },

    replaceView(ViewClass, data) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.currentView = new ViewClass({app: this, data});
        this.currentView.render();
    },

    navigate(href) {
        Backbone.history.navigate(href, {trigger: true});
    },
});
