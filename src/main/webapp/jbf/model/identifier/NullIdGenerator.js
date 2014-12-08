Ext.define('JBF.model.identifier.NullIdGenerator', {
    extend: 'Ext.data.identifier.Generator',
    alias: 'data.identifier.nullgenerator',
    generate: function () {
        return null;
    }
});