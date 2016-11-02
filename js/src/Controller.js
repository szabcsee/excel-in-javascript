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
    }
};