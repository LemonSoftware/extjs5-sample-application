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
        'JBF.view.UserGrid',
        'JBF.view.DepartmentGrid'
    ],

    controllers: [
        'JBF.controller.UserController',
        'JBF.controller.DepartmentController'
    ],

    init: function() {
    },

    autoCreateViewport: 'JBF.view.Viewport'
});