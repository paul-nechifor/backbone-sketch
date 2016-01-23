import $ from 'jquery';
import Backbone from 'backbone';
import * as api from '../utils/api';

export default Backbone.View.extend({
  events: {
    'submit form': 'onSubmit',
  },

  template: require('./SignInPane.jade'),

  initialize() {
    this.alertTimeoutId = null;
    this.alertTimeout = 5000;
  },

  render() {
    this.$el.html(this.template());
    this.$form = this.$('form');
    this.$username = this.$('.username');
    this.$password = this.$('.password');
    this.$alert = this.$('.alert');
    return this;
  },

  onSubmit(ev) {
    ev.preventDefault();
    this.submitData({
      username: this.$username.val(),
      password: this.$password.val(),
    });
  },

  submitData(data) {
    api.post('/api/auth/login', data, (err, res) => {
      if (err) {
        return this.showError(err.msg);
      }
      this.trigger('success', res.user);
    });
  },

  showError(text, onCleanUpCb) {
    this.resetForm();
    this.$alert.append($('<p/>').text(text)).show();
    if (this.alertTimeoutId) {
      clearTimeout(this.alertTimeoutId);
    }
    this.alertTimeoutId = setTimeout(() => {
      this.$alert.empty().hide();
      if (onCleanUpCb) {
        onCleanUpCb();
      }
    }, this.alertTimeout);
  },

  resetForm() {
    this.$username.val('').focus();
    this.$password.val('');
  },

  remove() {
    Backbone.View.prototype.remove.call(this);
  },
});
