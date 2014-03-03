Ext.define('CustomApp', {
    extend: 'Rally.app.TimeboxScopedApp',
    componentCls: 'app',
    scopeType: 'iteration',
    onScopeChange: function(scope) {
        this._iteration = scope.record.get('_ref');
        if (!this.down('#addNew')) {
	     var addNewConfig = {
            xtype: 'rallyaddnew',
            itemId: 'addNew',
            recordTypes: ['User Story', 'Defect'],
            ignoredRequiredFields: ['Name', 'ScheduleState', 'Project'],
            showAddWithDetails: false,
            listeners: {
                beforecreate: this._onBeforeCreate,
                scope: this
            }
        }; 
	}
       
        
        this.addNew = this.add(addNewConfig);
        if(!this.board) {
             this.board = this.add({
                xtype: 'rallycardboard',
                storeConfig: {
                    filters: [scope.getQueryFilter()]
                }
            });
        } else {
            this.board.refresh({
                storeConfig: {
                    filters: [scope.getQueryFilter()]
                }
            });
        }
        this.iteration = scope.getRecord();
    },
    
    _onBeforeCreate: function(addNewComponent, record) {
    record.set('Iteration', this._iteration);
}
});