import $ from 'jquery';
import SignInPane from './SignInPane';
import * as api from '../utils/api';

describe('SignInPane', () => {
    function init() {
        return new SignInPane({el: $('<div/>')}).render();
    }

    it('should send data if I submit the view', () => {
        const pane = init();
        pane.$username.val('uname');
        pane.$password.val('pword');
        pane.submitData = sinon.spy();
        pane.$form.submit();
        pane.submitData.should.have.been.calledWith({
            username: 'uname',
            password: 'pword',
        });
    });

    it('should reset the form if an error is shown', () => {
        const pane = init();
        pane.$username.val('x');
        pane.$password.val('y');
        pane.showError('some error text');
        pane.$username.val().should.equal('');
        pane.$password.val().should.equal('');
    });

    it('should be able to display errors', cb => {
        const pane = init();
        const errorText = 'This is my error text.';
        pane.alertTimeout = 0;
        pane.showError(errorText, () => {
            cb();
        });
        pane.$el.html().should.contain(errorText);
    });

    it('should show an error message if the auth failed', () => {
        const errorMessage = 'my errro message';
        const pane = init();
        sinon.stub(api, 'post', (url, data, cb) => {
            cb({msg: errorMessage});
        });
        pane.showError = sinon.spy();
        pane.submitData('data');
        api.post.restore();
        pane.showError.should.have.been.calledWith(errorMessage);
    });

    it('should notify me if the auth succeeded', () => {
        const spy = sinon.spy();
        const pane = init().once('success', spy);
        sinon.stub(api, 'post', (url, data, cb) => {
            cb(null, {user: 'Paul'});
        });
        pane.submitData('data');
        api.post.restore();
        spy.should.have.been.calledWith('Paul');
    });
});
