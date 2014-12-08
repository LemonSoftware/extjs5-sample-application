Ext.application({
    name: 'JBF',
    appFolder: 'jbf',

    requires: [
        'Ext.layout.container.*',
        'Ext.resizer.Splitter',
        'Ext.fx.target.Element',
        'Ext.fx.target.Component',
        'Ext.window.Window',
        'JBF.*'
    ],

    views: [
        'JBF.view.user.UserGrid'
    ],

    controllers: [
        'JBF.controller.UserController'
    ],

    init: function() {
    },

    autoCreateViewport: 'JBF.view.Viewport'
});