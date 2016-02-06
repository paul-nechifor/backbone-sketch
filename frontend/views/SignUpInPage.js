import AbstractPage from './AbstractPage';
import HomePage from './HomePage';
import SignInPane from '../panes/SignInPane';
import SignUpPane from '../panes/SignUpPane';

export default AbstractPage.extend({
  template: require('./SignUpInPage.jade'),

  render() {
    this.$el.html(this.template());

    this.signInPane = new SignInPane({
      el: this.$('.sign-in-pane'),
    }).once('success', this.onSuccess, this).render();
    this.signInPane.$username.focus();

    this.signUpPane = new SignUpPane().render();
    this.signUpPane.$el.appendTo(this.$('.sign-up-pane-wrapper'));

    return this;
  },

  onSuccess(user) {
    this.app.user.logIn(user);
    this.app.replaceView(HomePage);
  },

  remove() {
    this.signInPane.remove();
    this.signUpPane.remove();
    AbstractPage.prototype.remove.call(this);
  },
});
