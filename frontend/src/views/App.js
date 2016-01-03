import $ from 'jquery';
import Backbone from 'backbone';
import Router from '../Router';
import ActivatableLinkSet from '../utils/ActivatableLinkSet';
import templates from '../../../build/templates';

export default Backbone.View.extend({
    initialize() {
        this.router = new Router({app: this});
        this.templates = templates;
        this.content = null;
        this.currentView = null;
        this.activatableLinkSet = new ActivatableLinkSet();
    },

    start() {
        $('body').html(`
            <div id="app"></div>
            <script src='/bower/bootswatch-dist/js/bootstrap.min.js'></script>
        `);
        const app = $('#app');
        app.html(this.templates.app(this.model));
        this.content = app.find('.content');
        this.activatableLinkSet.load(app);
        if (!Backbone.History.started) {
            Backbone.history.start({pushState: true, root: '/'});
        }
        this.hijackLinks();
    },

    hijackLinks() {
        const that = this;

        $(document).on('click', 'a[href]', function (ev) {
            const a = $(this);
            const href = a.attr('href');
            if (href[0] === '/') {
                ev.preventDefault();
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
        this.activatableLinkSet.lookUp(window.location.pathname);
    },

    navigate(href) {
        Backbone.history.navigate(href, {trigger: true});
    },
});
