import AlertListPane from './AlertListPane';

describe('AlertListPane', () => {
  let pane = null;

  beforeEach(() => {
    pane = new AlertListPane().render();
  });

  afterEach(() => {
    pane.remove();
  });

  describe('.addAlert', () => {
    it('should create and render the pane', () => {
      pane.should.be.an.instanceof(AlertListPane);
    });

    it('should display an alert', () => {
      pane.addAlert({text: 'This should look okay.'});
      pane.$el.html().should.contain('This should look okay.');
    });

    it('should display a danger alert', () => {
      pane.addAlert({type: 'danger', text: 'Message.'});
      pane.$('.alert.alert-danger').should.have.length(1);
    });

    it('should have a default type of info', () => {
      pane.addAlert({text: 'Message.'});
      pane.$('.alert.alert-info').should.have.length(1);
    });

    it('should complain if a message is missing', () => {
      (() => {
        pane.addAlert({});
      }).should.throw('No "text" or "html" key provided.');
    });

    it('should remove the message after it has expired', () => {
      const clock = sinon.useFakeTimers();
      pane.addAlert({text: 'Message.', ttl: 2000});
      clock.tick(2100);
      pane.$el.html().should.not.contain('Message.');
      clock.restore();
    });

    it('should support HTML', () => {
      pane.addAlert({html: 'A <em>B</em> C'});
      pane.$el.html().should.contain('A <em>B</em> C');
    });
  });
});
