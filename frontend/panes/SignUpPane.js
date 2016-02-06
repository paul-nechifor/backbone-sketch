import Backbone from 'backbone';

export default Backbone.View.extend({
  template: require('./SignUpPane.jade'),

  events: {
  },

  render() {
    this.$el.html(this.template());
    return this;
  },
});
