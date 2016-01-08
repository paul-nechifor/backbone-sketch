export default {
    pages: {
        about: require('./pages/about.jade'),
        homepage: require('./pages/homepage.jade'),
        notFound: require('./pages/notFound.jade'),
        signUpIn: require('./pages/signUpIn.jade'),
    },
    panes: {
        signInPane: require('./panes/signInPane.jade'),
    },
    app: require('./app.jade'),
};
