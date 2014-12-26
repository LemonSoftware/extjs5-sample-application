Ext.define('JBF.view.Viewport', {
    extend: 'Ext.container.Viewport',
    uses: [
        'JBF.view.UserGrid',
        'JBF.view.DepartmentGrid'

    ],
    initComponent: function () {
        Ext.apply(this, {
            layout: {
                type: 'border'
            },
            items: [
                {
                    region: 'center',
                    xtype: 'tabpanel',
                    items: [
                        {
                            itemId: 'DepartmentManagementGridId',
                            title: 'Department Management',
                            xtype: 'DepartmentGrid'
                        }
                        ,
                        {
                            itemId: 'EmployeeManagementGridId',
                            title: 'Employee Management',
                            xtype: 'UserGrid',
                            reference: 'userGrid'
                        }



                    ]
                }

            ]
        });
        this.callParent(arguments);
    }
});