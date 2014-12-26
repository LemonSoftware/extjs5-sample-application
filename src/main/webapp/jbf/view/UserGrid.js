Ext.define('JBF.view.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.UserGrid',
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
                , {
                    header: 'Department',
                    //dataIndex: 'name',
                    flex: 1,
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        return record.data != null && record.data.department != null ? record.data.department.name : '';
                    },
                    editor: {
                        allowBlank: true,
                        xtype: 'combo',
                        displayField: 'name',
                        valueField: 'id',
                        value: 'Select department...',
                        store: Ext.getStore('DepartmentStore'),
                        listeners:{
                            'select': function(combo, records){
                                this.up('UserGrid').getSelectionModel().getSelection()[0].data.department = records[0].data;
                            }
                        }
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
