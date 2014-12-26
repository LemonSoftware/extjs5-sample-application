
Ext.define('JBF.model.DepartmentModel', {
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
    xtype: 'int'

} ,
{
name: 'name',
    type: 'string'

}

],
    hasMany  : {model: 'JBF.model.UserModel', name: 'employees'}
});