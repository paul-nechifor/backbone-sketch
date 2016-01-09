import AbstractPage from './AbstractPage';
import * as api from '../utils/api';

require('./PeoplePage.styl');

export default AbstractPage.extend({
    template: require('./PeoplePage.jade'),

    render() {
        api.get('/api/people', {}, (err, data) => {
            if (err) {
                return alert(err);
            };
            this.$el.html(this.template(data));
        });
    },
});
