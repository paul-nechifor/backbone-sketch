import * as api from '../utils/api';
import AbstractPage from './AbstractPage';
import PaginatorPane from '../panes/PaginatorPane';
import PeopleListPane from '../panes/PeopleListPane';

export default AbstractPage.extend({
    template: require('./PeoplePage.jade'),

    render() {
        this.$el.html(this.template());
        this.initPanes();
        this.getNewPage(this.data.index);
    },

    initPanes() {
        this.peopleListPane = new PeopleListPane({
            el: this.$el.find('.people-list-container').get(0),
        });

        const onPageChange = this.getNewPage.bind(this);

        this.paginatorPane1 = new PaginatorPane({
            el: this.$el.find('.pager1').get(0),
            urlPrefix: '/people/page',
            onPageChange,
        });

        this.paginatorPane2 = new PaginatorPane({
            el: this.$el.find('.pager2').get(0),
            urlPrefix: '/people/page',
            onPageChange,
        });
    },

    getNewPage(index) {
        api.get('/api/people', {index}, (err, res) => {
            if (err) {
                return alert(err); // eslint-disable-line no-alert
            }
            this.peopleListPane.render(res.list);
            this.paginatorPane1.render(res.totalPages, index);
            this.paginatorPane2.render(res.totalPages, index);
        });
    },
});
