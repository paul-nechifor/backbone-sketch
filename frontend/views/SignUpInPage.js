import AbstractPage from './AbstractPage';
import HomePage from './HomePage';
import SignInPane from '../panes/SignInPane';

export default AbstractPage.extend({
    render() {
        this.$el.html(this.app.templates.pages.signUpIn());
        this.signInPane = new SignInPane({
            el: this.$el.find('.sign-in-pane').get(0),
        }).onSuccess(user => {
            this.onSuccess(user);
        }).render();
        this.signInPane.$username.focus();
    },

    onSuccess(user) {
        this.app.user.logIn(user);
        this.app.replaceView(HomePage);
    },

    remove() {
        this.signInPane.remove();
        AbstractPage.prototype.remove.call(this);
    },
});
