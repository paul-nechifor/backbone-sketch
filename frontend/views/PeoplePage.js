import * as api from '../utils/api';
import AbstractPage from './AbstractPage';
import PaginatorPane from '../panes/PaginatorPane';
import PeopleListPane from '../panes/PeopleListPane';

export default AbstractPage.extend({
  template: require('./PeoplePage.jade'),

  render() {
    this.urlPrefix = '/people/page';
    this.$el.html(this.template());
    this.initPanes();
    this.getNewPage(this.data.index);
    return this;
  },

  initPanes() {
    this.peopleListPane = new PeopleListPane({
      el: this.$('.people-list-container'),
    });

    const onPageChange = this.getNewPage.bind(this);

    this.paginatorPane1 = new PaginatorPane({
      el: this.$('.pager1'),
      urlPrefix: this.urlPrefix,
    }).on('pageChange', onPageChange);

    this.paginatorPane2 = new PaginatorPane({
      el: this.$('.pager2'),
      urlPrefix: this.urlPrefix,
    }).on('pageChange', onPageChange);
  },

  getNewPage(strPage) {
    const page = Number(strPage) || 1;
    api.get('/api/people', {page}, (err, res) => {
      if (err) {
        return alert(err); // eslint-disable-line no-alert
      }
      this.peopleListPane.render(res.list);
      this.paginatorPane1.render(res.totalPages, page);
      this.paginatorPane2.render(res.totalPages, page);
    });
    this.app.changeUrl(`${this.urlPrefix}/${page}`);
  },
});
