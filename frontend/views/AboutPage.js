import AbstractPage from './AbstractPage';

export default AbstractPage.extend({
    template: require('./AboutPage.jade'),

    render() {
        this.$el.html(this.template());
    },
});
