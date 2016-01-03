import $ from 'jquery';

export default class {
    constructor() {
        this.links = {};
        this.previous = null;
    }

    load(parent) {
        const that = this;
        parent.find('a.activatable').map(function () {
            const jEl = $(this);
            that.links[jEl.attr('href')] = jEl;
        });
    }

    lookUp(url) {
        if (this.previous) {
            this.previous.removeClass('active');
        }
        const el = this.links[url];
        if (el) {
            this.previous = el.parent();
            this.previous.addClass('active');
        } else {
            this.previous = null;
        }
    }
}
