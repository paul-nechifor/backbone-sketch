import * as api from '../utils/api';
import AlertListPane from './AlertListPane';
import Backbone from 'backbone';

export default Backbone.View.extend({
  template: require('./SignInPane.jade'),

  events: {
    'submit form': 'onSubmit',
  },

  render() {
    this.$el.html(this.template());

    this.alertListPane = new AlertListPane().render();
    this.$('.alert-wrapper').append(this.alertListPane.$el);

    this.$form = this.$('form');
    this.$username = this.$('.username');
    this.$password = this.$('.password');

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

  showError(text) {
    this.resetForm();
    this.alertListPane.addAlert({text});
  },

  resetForm() {
    this.$username.val('').focus();
    this.$password.val('');
  },

  remove() {
    this.alertListPane.remove();
    Backbone.View.prototype.remove.call(this);
  },
});
