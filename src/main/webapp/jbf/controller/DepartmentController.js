
Ext.define('JBF.controller.DepartmentController', {
    extend: 'Ext.app.Controller',

    models: [
        'DepartmentModel'
    ],

    stores: [
        'DepartmentStore'
    ],

    views: [
'JBF.view.DepartmentGrid'
    ],

    refs: [
        {ref: 'addDepartmentBtn', selector: 'button[itemId = addDepartmentBtnId]'},
        {ref: 'deleteDepartmentBtn', selector: 'button[itemId = deleteDepartmentBtnId]'},
        {ref: 'mainGridPanel', selector: 'DepartmentGrid[itemId = DepartmentManagementGridId]'}
    ],

    init: function () {
        this.control({
            'DepartmentGrid[itemId = DepartmentManagementGridId]': {
                'edit': this.onRowEditFinished,
                'canceledit': this.onRowEditCanceled,
                'selectionchange': this.onSelectRow
            },
            'button[itemId=addDepartmentBtnId]': {
                'click': this.DepartmentAdd
            },
            'button[itemId=deleteDepartmentBtnId]': {
                'click': this.DepartmentDelete
            }
        })
},

    onSelectRow: function (view, records) {
        this.getDeleteDepartmentBtn().setDisabled(!records.length);
    },

    onRowEditFinished: function (editor, context, eOpts) {
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/webapi/departments/update',
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
        var store = this.getStore('DepartmentStore');
        var recordData = sm.getSelection()[0].data;
        if (!recordData.id) {
            store.remove(sm.getSelection());
            if (store.getCount() > 0) {
                sm.select(0);
            }
        }
    },

    DepartmentAdd: function () {
        var rowEditor = this.getMainGridPanel().getPlugin('roweditorid');
        rowEditor.cancelEdit();
        var newRecord = Ext.create('JBF.model.DepartmentModel');
        this.id = this.id + 1;
        var store = Ext.getStore('DepartmentStore');
        store.insert(0, newRecord);
        this.getMainGridPanel().getView().refresh();
        rowEditor.startEdit(0, 0);
    },

    DepartmentDelete: function () {
        var sm = this.getMainGridPanel().getSelectionModel();
        var rowEditor = this.getMainGridPanel().getPlugin('roweditorid');
        var store = Ext.getStore('DepartmentStore');
        rowEditor.cancelEdit();
        var selectedRecord = sm.getSelection();
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete Department?', function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'POST',
                    url: '/webapi/departments/delete?id=' + selectedRecord[0].data.id,
                    success: function (response) {
                        store.remove(selectedRecord);
                        if (store.getCount() > 0) {
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
    var newRecord = Ext.create('JBF.model.DepartmentModel', {
        id: data.id,
        name: data.name
    });
    this.refreshSelectedRecord(newRecord);
    },
    refreshSelectedRecord: function (record) {
        var store = Ext.getStore('DepartmentStore');
        var selectedIndex = store.indexOf(this.getMainGridPanel().getSelectionModel().getSelection()[0]);
        Ext.getStore('DepartmentStore').remove(this.getMainGridPanel().getSelectionModel().getSelection()[0]);
        Ext.getStore('DepartmentStore').insert(selectedIndex, record);
    }
});