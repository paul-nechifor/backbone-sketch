import views from '../views';

export default {
    menu: {
        brand: {
            text: 'Backbone Sketch',
            url: '/',
            viewClass: views.HomePage,
        },
        topLinks: [
            {
                text: 'About',
                url: '/about',
                viewClass: views.AboutPage,
            },
        ],
    },
};
