import AbstractPage from './AbstractPage';
import SignInPane from '../panes/SignInPane';

export default AbstractPage.extend({
    render() {
        this.$el.html(this.app.templates.pages.signUpIn());
        this.signInPane = new SignInPane({
            el: this.$el.find('.sign-in-pane').get(0),
        }).render();
    },
});
