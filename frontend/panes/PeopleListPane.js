import Backbone from 'backbone';

require('./PeopleListPane.styl');

export default Backbone.View.extend({
    template: require('./PeopleListPane.jade'),

    render(list) {
        this.$el.html(this.template(list));
    },
});
