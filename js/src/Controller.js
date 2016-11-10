/**
 * The controller listens to events in the View and reacts to them
 * directly calling the Model's functions
 * @param {[type]} model [description]
 * @param {[type]} view  [description]
 */
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

    /**
     * Assign Controller functions to the Event listeners with binding the proper scope
     * @return {[type]} [description]
     */
    setupHandlers: function() {
        this.addRowHandler = this.addRowButton.bind(this);
        this.addColumnHandler = this.addColumnButton.bind(this);
        this.deleteRowHandler = this.deleteRowButton.bind(this);
        this.deleteColumnHandler = this.deleteColumnButton.bind(this);
		this.activeCellChangeHandler = this.activeCellChangeUpdate.bind(this);
        this.updateCellValueHandler = this.updateCellValue.bind(this);
        return this;
    },

    /**
     * Attach Event handlers to the various Events of the View
     * @return {[type]} [description]
     */
	enable: function() {
		this.view.addRowEvent.attach(this.addRowHandler);
        this.view.addColumnEvent.attach(this.addColumnHandler);
        this.view.deleteRowEvent.attach(this.deleteRowHandler);
        this.view.deleteColumnEvent.attach(this.deleteColumnHandler);
		this.view.activeCellChangeEvent.attach(this.activeCellChangeHandler);
        this.view.updateCellValueEvent.attach(this.updateCellValueHandler);

		return this;
	},

    /**
     * [addRowButton description]
     * @param {[type]} sender [description]
     * @param {[type]} args   [description]
     */
	addRowButton: function (sender, args) {
        this.model.addRow(args.rowId);
	},

    /**
     * [addColumnButton description]
     * @param {[type]} sender [description]
     * @param {[type]} args   [description]
     */
    addColumnButton: function(sender, args) {
        this.model.addColumn(args.colId);
    },

    /**
     * [deleteRowButton description]
     * @param  {[type]} sender [description]
     * @param  {[type]} args   [description]
     * @return {[type]}        [description]
     */
    deleteRowButton: function (sender, args) {
        this.model.deleteRow(args.rowId);
    },

    /**
     * [deleteColumnButton description]
     * @param  {[type]} sender [description]
     * @param  {[type]} args   [description]
     * @return {[type]}        [description]
     */
    deleteColumnButton: function(sender, args) {
        this.model.deleteColumn(args.colId);
    },

    /**
     * [activeCellChangeUpdate description]
     * @param  {[type]} sender [description]
     * @param  {[type]} args   [description]
     * @return {[type]}        [description]
     */
	activeCellChangeUpdate: function(sender, args) {
        var cell =  args;
        this.model.updateCurrentCell(cell);
	},

    /**
     * [updateCellValue description]
     * @param  {[type]} sender [description]
     * @param  {[type]} args   [description]
     * @return {[type]}        [description]
     */
    updateCellValue: function(sender, args) {
        console.log('Modified cell value updated.');

        this.model.updateCellValue(args);
    }
};