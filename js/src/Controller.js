var ExtCelController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

ExtCelController.prototype = {

    init: function() {
        this.setupHandlers();
        this.enable();
    },

    setupHandlers: function() {
        this.addRowButtonHandler = this.addRowButton.bind(this);
        //this.addColumnButtonHandler = this.addColumnButton.bind(this);
        //this.deleteRowButtonHandler = this.deleteRowButton.bind(this);
        //this.deleteColumnButtonHandler = this.deleteColumnButton.bind(this);
		this.activeCellChangeHandler = this.activeCellChangeUpdate.bind(this);
        this.updateCellValueHandler = this.updateCellValue.bind(this);
        return this;
    },

	enable: function() {
		this.view.addRowEvent.attach(this.addRowHandler);
		this.view.activeCellChangeEvent.attach(this.activeCellChangeHandler);
        this.view.updateCellValueEvent.attach(this.updateCellValueHandler);

		return this;
	},

	addRowButton: function (sender, args) {
	        //this.model.addTask(args.task);
			alert('action called from the controller.');
	},

	activeCellChangeUpdate: function(sender, args) {
        var cell =  args;
        this.model.updateCurrentCell(cell);
        console.log('Active Cell updated');

        $('#currently_edited').html(' column: ' + cell.colId + ' row: ' + cell.rowId + ' value: ' + cell.cellValue);

        return this;
	},

    updateCellValue: function(sender, args) {
        console.log('Modified cell value updated.');

        this.model.updateCellValue(args);
    }
};