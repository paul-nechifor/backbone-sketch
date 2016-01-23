import $ from 'jquery';
import App from './App';
import Backbone from 'backbone';

describe('App', () => {
  let app = null;

  beforeEach(() => {
    $('body').html('<div id="app"></div>');
    app = new App({el: $('#app')}).render();
    if (window.location.pathname === '/context.html') {
      Backbone.history.navigate('/', {trigger: true});
    }
  });

  afterEach(() => {
    app.remove();
  });

  it('should show the homepage by default', () => {
    app.$content.html().should.contain('<h1>Backbone Sketch</h1>');
  });

  it('should be able to navigate to about page', () => {
    app.navigate('/about');
    app.$content.text().trim().should.equal('About page');
    window.location.pathname.should.equal('/about');
  });

  it('should prevent local links from reloading the page', () => {
    app.navigate('/about');
    window.location.pathname.should.equal('/about');
    $('a.navbar-brand').click();
    window.location.pathname.should.equal('/');
  });
});
