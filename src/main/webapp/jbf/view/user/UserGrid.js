Ext.define('JBF.view.user.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userGrid',
    initComponent: function () {
        Ext.apply(this, {
            store: Ext.getStore('UserStore'),
            loadMask: true,
            frame: true,
            layout: 'auto',
            columns: [
                {
                    header: 'Username',
                    dataIndex: 'username',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Fistname',
                    dataIndex: 'firstname',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Lastname',
                    dataIndex: 'lastname',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            tbar: [
                {
                    itemId: 'addUserBtnId',
                    text: 'Add Employee',
                    iconCls: 'user_add_button'
                },
                {
                    itemId: 'deleteUserBtnId',
                    text: 'Delete User',
                    iconCls: 'user_delete_button',
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
