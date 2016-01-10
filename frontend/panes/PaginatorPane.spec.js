import PaginatorPane from './PaginatorPane';

describe('PaginatorPane', () => {
    function init(urlPrefix = '/prefix') {
        return new PaginatorPane({urlPrefix});
    }

    it('should disable the left button on page 1', () => {
        init().getPaginatorData(5, 1)
        .should.have.deep.property('[0].classes', 'disabled');
    });

    it('should disable the right button on the last page', () => {
        init().getPaginatorData(5, 5)
        .should.have.deep.property('[6].classes', 'disabled');
    });

    it('should show the current page as active', () => {
        init().getPaginatorData(5, 2)
        .should.have.deep.property('[2].classes', 'active');
    });

    it('should include the url for actual pages', () => {
        init('/my/url').getPaginatorData(5, 4)
        .should.have.deep.property('[2].url', '/my/url/2');
    });

    it('should call back when one of the links is clicked', () => {
        const pane = new PaginatorPane({
            el: document.getElementById('app'),
            urlPrefix: '/my/prefix',
            onPageChange: sinon.spy(),
        });
        pane.render(5, 2);
        pane.$el.find('a[href="/my/prefix/3"]').click();
        pane.onPageChange.should.have.been.calledWith(3);
    });
});
