import AbstractPage from './AbstractPage';

export default AbstractPage.extend({
    template: require('./NotFoundPage.jade'),

    render() {
        this.$el.html(this.template({url: this.data[0]}));
    },
});
