import $ from 'jquery';
import Backbone from 'backbone';
import Router from './Router';
import templates from '../../build/templates';

export default class {
    constructor() {
        this.router = new Router({app: this});
        this.templates = templates;
        this.appDiv = null;
    }

    init() {
        window.$ = window.jQuery = $; // This is needed by Bootstrap.
        const body = $('body');
        body.html(this.templates.body());
        this.appDiv = body.find('#app');
        if (!Backbone.History.started) {
            Backbone.history.start({pushState: true, root: '/'});
        }
        this.hijackLinks();
        return this;
    }

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
    }

    homepage() {
        this.appDiv.html(this.templates.pages.homepage());
    }

    about() {
        this.appDiv.html(this.templates.pages.about());
    }

    navigate(href) {
        Backbone.history.navigate(href, {trigger: true});
    }
}
