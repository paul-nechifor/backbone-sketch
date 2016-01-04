import $ from 'jquery';
import Backbone from 'backbone';
import templates from '../../templates';
import * as api from '../../utils/api';

export default Backbone.View.extend({
    events: {
        'submit form': 'onSubmit',
    },

    initialize() {
        this.onSuccessCb = null;
        this.alertTimeoutId = null;
        this.alertTimeout = 5000;
    },

    render() {
        this.$el.html(templates.panes.signInPane());
        this.$form = this.$el.find('form');
        this.$username = this.$el.find('.username');
        this.$password = this.$el.find('.password');
        this.$alert = this.$el.find('.alert');
        return this;
    },

    onSuccess(cb) {
        this.onSuccessCb = cb;
        return this;
    },

    onSubmit(ev) {
        ev.preventDefault();
        this.submitData({
            username: this.$username.val(),
            password: this.$password.val(),
        });
    },

    submitData(data) {
        api.post('/api/auth/login', data, (err, res) => {
            if (err) {
                return this.showError(err.msg);
            }
            if (this.onSuccessCb) {
                this.onSuccessCb(res.user);
                this.onSuccessCb = null;
            }
        });
    },

    showError(text, onCleanUpCb) {
        this.resetForm();
        this.$alert.append($('<p/>').text(text)).show();
        if (this.alertTimeoutId) {
            clearTimeout(this.alertTimeoutId);
        }
        this.alertTimeoutId = setTimeout(() => {
            this.$alert.empty().hide();
            if (onCleanUpCb) {
                onCleanUpCb();
            }
        }, this.alertTimeout);
    },

    resetForm() {
        this.$username.val('').focus();
        this.$password.val('');
    },

    remove() {
        this.onSuccessCb = null;
        Backbone.View.prototype.call(this);
    },
});
