import $ from 'jquery';
import * as api from '../utils/api';
import SignInPane from './SignInPane';

describe('SignInPane', () => {
  let pane = null;

  beforeEach(() => {
    pane = new SignInPane({el: $('<div/>')}).render();
  });

  afterEach(() => {
    pane.remove();
  });

  it('should send data if I submit the view', () => {
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
    pane.$username.val('x');
    pane.$password.val('y');
    pane.showError('some error text');
    pane.$username.val().should.equal('');
    pane.$password.val().should.equal('');
  });

  it('should be able to display errors', () => {
    const errorText = 'This is my error text.';
    pane.showError(errorText);
    pane.$el.html().should.contain(errorText);
  });

  it('should show an error message if the auth failed', () => {
    const errorMessage = 'my errro message';
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
    pane.once('success', spy);
    sinon.stub(api, 'post', (url, data, cb) => {
      cb(null, {user: 'Paul'});
    });
    pane.submitData('data');
    api.post.restore();
    spy.should.have.been.calledWith('Paul');
  });
});
