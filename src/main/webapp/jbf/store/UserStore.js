Ext.define('JBF.store.UserStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoDestroy: false,
    remoteSort: false,
    remoteFilter: false,
    model: 'JBF.model.UserModel',
    proxy: {

        type: 'ajax',
        url: '/webapi/users/all',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        pageParam: false,
        startParam: false,
        limitParam: false
    }
});
