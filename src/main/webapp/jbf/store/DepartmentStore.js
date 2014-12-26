
Ext.define('JBF.store.DepartmentStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoDestroy: false,
    remoteSort: false,
    remoteFilter: false,

model: 'JBF.model.DepartmentModel',
    proxy: {

        type: 'ajax',
        url: '/webapi/departments/all',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        pageParam: false,
        startParam: false,
        limitParam: false
    }
});
