Ext.define('JBF.view.Viewport', {
    extend: 'Ext.container.Viewport',
    uses: [
        'JBF.view.user.UserGrid'
    ],
    initComponent: function () {
        Ext.apply(this, {
            layout: {
                type: 'border'
            },
            items: [
                {
                    itemId: 'userManagementGridId',
                    title: 'User Management',
                    xtype: 'userGrid',
                    region: 'center'
                }

            ]
        });
        this.callParent(arguments);
    }
});