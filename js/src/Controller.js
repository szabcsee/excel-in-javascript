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

        return this;
    },
	
	enable: function() {
		this.view.addRowEvent.attach(this.addRowHandler);
		
		return this;
	},
	
	addTask: function (sender, args) {
	        //this.model.addTask(args.task);
			alert('action called from the controller.');
	},
};