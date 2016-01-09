import AbstractPage from './AbstractPage';

export default AbstractPage.extend({
    template: require('./HomePage.jade'),

    render() {
        this.$el.html(this.template());
    },
});
