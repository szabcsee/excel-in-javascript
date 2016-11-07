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
        this.addColumnButtonHandler = this.addColumnButton.bind(this);
        this.deleteRowButtonHandler = this.deleteRowButton.bind(this);
        this.deleteColumnButtonHandler = this.deleteColumnButton.bind(this);
		this.activeCellChangeHandler = this.activeCellChangeUpdate(this);
        return this;
    },
	
	enable: function() {
		this.view.addRowEvent.attach(this.addRowHandler);
		this.view.activeCellChangeEvent.attach(this.activeCellChangeHandler);
		
		return this;
	},
	
	addRowButton: function (sender, args) {
	        //this.model.addTask(args.task);
			alert('action called from the controller.');
	},
	
	activeCellChangeUpdate: function(sender, args) {
		debugger;
		this.model.activeCellChange(args);
	}
};