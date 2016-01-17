import SignUpInPage from './SignUpInPage';

describe('SignUpInPage', () => {
    it('should focus the sign up username field on start', () => {
        const page = new SignUpInPage({el: document.getElementById('app')});
        page.render();
        page.signInPane.$username.is(':focus');
    });
});
