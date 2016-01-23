import $ from 'jquery';
import Backbone from 'backbone';
import Menu from './Menu';
import Router from '../Router';
import User from '../models/User';

require('./App.styl');

export default Backbone.View.extend({
  el: '#app',

  template: require('./App.jade'),

  initialize() {
    this.router = new Router({app: this});
    this.$content = null;
    this.currentView = null;
    this.menu = null;
    this.user = new User();
  },

  render() {
    this.$el.html(this.template(this.model));
    this.menu = new Menu({
      app: this,
      el: this.$('.navbar-wrapper'),
    }).render();
    this.$content = this.$('.content');
    if (!Backbone.History.started) {
      Backbone.history.start({pushState: true, root: '/'});
    }
    this.hijackLinks();
    return this;
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
    this.$content.empty();
    const el = $('<div/>');
    this.$content.append(el);
    this.currentView = new ViewClass({app: this, el: el.get(0), data});
    this.currentView.render();
    this.menu.lookUp(window.location.pathname);
  },

  navigate(href) {
    Backbone.history.navigate(href, {trigger: true});
  },

  changeUrl(href) {
    Backbone.history.navigate(href);
  },
});
