import Backbone from 'backbone';

export default Backbone.Model.extend({
  initialize() {
    this.logOut();
  },

  logIn(data) {
    this.set({loggedIn: true, data});
  },

  logOut() {
    this.set({loggedIn: false, data: null});
  },
});
