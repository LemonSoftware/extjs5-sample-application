Ext.define('JBF.model.UserModel', {
    extend: 'Ext.data.Model',
    requires: [
        'JBF.model.identifier.NullIdGenerator'
    ],
    identifier: {
        type: 'nullgenerator'
    },
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'firstname',
            type: 'string'
        },
        {
            name: 'lastname',
            type: 'string'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
          name:'departmentId',
            reference: 'JBF.model.DepartmentModel'
        }
    ]
});