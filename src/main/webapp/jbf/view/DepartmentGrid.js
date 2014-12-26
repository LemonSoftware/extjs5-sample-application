
Ext.define('JBF.view.DepartmentGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.DepartmentGrid',
    initComponent: function () {
        Ext.apply(this, {
            store: Ext.getStore('DepartmentStore'),
            loadMask: true,
            frame: true,
            layout: 'auto',
            columns: [
        {
        header: 'Name',
        dataIndex: 'name',
        flex: 1,
        editor: {
            allowBlank: true
        }
        }

            ],
            tbar: [
                {
                    itemId: 'addDepartmentBtnId',
                    text: 'Add Department',
                    iconCls: 'add_button'
                },
                {
                    itemId: 'deleteDepartmentBtnId',
                    text: 'Delete Department',
                    iconCls: 'delete_button',
                    disabled: true
                }
            ],
            plugins: [
                {
                    pluginId: 'roweditorid',
                    ptype: 'rowediting',
                    clicksToMoveEditor: 1,
                    clickToEdit: 2,
                    autoCancel: false
                }
            ]
        });
        this.callParent(arguments);
    }
});
