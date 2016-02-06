import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

export default Backbone.View.extend({
  defaultAlertOpts: {
    type: 'info',
    ttl: 5000,
  },

  addAlert(opts) {
    opts = _.defaults(opts, this.defaultAlertOpts);

    const div = $('<div/>', {class: `alert alert-${opts.type}`})
    .appendTo(this.$el);

    if ('text' in opts) {
      div.text(opts.text);
    } else if ('html' in opts) {
      div.html(opts.html);
    } else {
      throw new Error('No "text" or "html" key provided.');
    }

    setTimeout(() => {
      div.remove();
    }, opts.ttl);
  },
});
