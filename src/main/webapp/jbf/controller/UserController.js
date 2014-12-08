Ext.define('JBF.controller.UserController', {
    extend: 'Ext.app.Controller',

    models: [
        'UserModel'
    ],

    stores: [
        'UserStore'
    ],

    views: [
        'user.UserGrid'
    ],

    refs: [
        {ref: 'addUserBtn', selector: 'button[itemId = addUserBtnId]'},
        {ref: 'deleteUserBtn', selector: 'button[itemId = deleteUserBtnId]'},
        {ref: 'mainGridPanel', selector: 'userGrid[itemId = userManagementGridId]'}
    ],

    init: function () {
        this.control({
            'userGrid[itemId = userManagementGridId]': {
                'edit': this.onRowEditFinished,
                'canceledit': this.onRowEditCanceled,
                'selectionchange': this.onSelectRow
            },
            'button[itemId=addUserBtnId]': {
                'click': this.userAdd
            },
            'button[itemId=deleteUserBtnId]': {
                'click': this.userDelete
            }
        })
    },

    onSelectRow: function (view, records) {
        this.getDeleteUserBtn().setDisabled(!records.length);
    },

    onRowEditFinished: function (editor, context, eOpts) {
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/webapi/users/update',
            jsonData: context.record.getData(),
            success: function (response) {
                var responseData = Ext.decode(response.responseText);
                if (!responseData.success) {
                    Ext.MessageBox.error('Error', 'Error occurs on server side.', response);
                }
                me.updateRecord(responseData.data);
            },
            failure: function (response) {
                Ext.MessageBox.alert('Error', 'Error while communicating with the server. Changes not saved on the server.', response);
            }
        });
    },

    onRowEditCanceled: function (editor, context, eOpts) {
        var sm = this.getMainGridPanel().getSelectionModel();
        var userStore = this.getStore('UserStore');
        var recordData = sm.getSelection()[0].data;
        if (!recordData.id) {
            userStore.remove(sm.getSelection());
            if (userStore.getCount() > 0) {
                sm.select(0);
            }
        }
    },

    userAdd: function () {
        var rowEditor = this.getMainGridPanel().getPlugin('roweditorid');
        rowEditor.cancelEdit();
        var newRecord = Ext.create('JBF.model.UserModel');
        this.id = this.id + 1;
        var userStore = Ext.getStore('UserStore');
        userStore.insert(0, newRecord);
        this.getMainGridPanel().getView().refresh();
        rowEditor.startEdit(0, 0);
    },

    userDelete: function () {
        var sm = this.getMainGridPanel().getSelectionModel();
        var rowEditor = this.getMainGridPanel().getPlugin('roweditorid');
        var userStore = Ext.getStore('UserStore');
        rowEditor.cancelEdit();
        var selectedRecord = sm.getSelection();
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete User?', function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'POST',
                    url: '/webapi/users/delete?id=' + selectedRecord[0].data.id,
                    success: function (response) {
                        userStore.remove(selectedRecord);
                        if (userStore.getCount() > 0) {
                            sm.select(0);
                        }
                        Ext.MessageBox.hide();
                    },
                    failure: function (response) {
                        Ext.MessageBox.hide();
                        Ext.MessageBox.alert('Error', 'Error while communicating with the server. Changes not saved on the server.', response);
                    }
                })
            }
        });
    },

    updateRecord: function (data) {
        var newRecord = Ext.create('JBF.model.UserModel', {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username
        });
        this.refreshSelectedRecord(newRecord);
    },

    refreshSelectedRecord: function (record) {
        var userStore = Ext.getStore('UserStore');
        var selectedIndex = userStore.indexOf(this.getMainGridPanel().getSelectionModel().getSelection()[0]);
        Ext.getStore('UserStore').remove(this.getMainGridPanel().getSelectionModel().getSelection()[0]);
        Ext.getStore('UserStore').insert(selectedIndex, record);
    }
});