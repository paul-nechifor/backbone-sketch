import AbstractPage from './AbstractPage';

export default AbstractPage.extend({
    render() {
        this.app.content.html(this.app.templates.pages.homepage());
    },
});
