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
        this.addRowHandler = this.addRowButton.bind(this);
        this.addColumnHandler = this.addColumnButton.bind(this);
        this.deleteRowHandler = this.deleteRowButton.bind(this);
        this.deleteColumnHandler = this.deleteColumnButton.bind(this);
		this.activeCellChangeHandler = this.activeCellChangeUpdate.bind(this);
        this.updateCellValueHandler = this.updateCellValue.bind(this);
        return this;
    },

	enable: function() {
		this.view.addRowEvent.attach(this.addRowHandler);
        this.view.addColumnEvent.attach(this.addColumnHandler);
        this.view.deleteRowEvent.attach(this.deleteRowHandler);
        this.view.deleteColumnEvent.attach(this.deleteColumnHandler);
		this.view.activeCellChangeEvent.attach(this.activeCellChangeHandler);
        this.view.updateCellValueEvent.attach(this.updateCellValueHandler);

		return this;
	},

	addRowButton: function (sender, args) {
        this.model.addRow(args.rowId);
	},

    addColumnButton: function(sender, args) {
        this.model.addColumn(args.colId);
    },

    deleteRowButton: function (sender, args) {
        this.model.deleteRow(args.rowId);
    },

    deleteColumnButton: function(sender, args) {
        this.model.deleteColumn(args.colId);
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