import AbstractPage from './AbstractPage';

export default AbstractPage.extend({
    render() {
        this.$el.html(this.app.templates.pages.notFound({url: this.data[0]}));
    },
});