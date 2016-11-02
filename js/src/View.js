var ExtCelView = function(model) {
    this.model = model;
    this.addCellValueEvent = new Event(this);
    this.updateCellValueEvent = new Event(this);
    this.deleteCellValueEvent = new Event(this);
    this.addRowEvent = new Event(this);
    this.removeRowEvent = new Event(this);
    this.addColumnEvent = new Event(this);
    this.removeColumnEvent = new Event(this);

    this.init();
};

ExtCelView.prototype = {

    init: function() {
        this.createContextMenu();
        this.createSheet();
        this.setupHandlers();
        this.fillSheet();
    },

    createSheet: function() {
        // cache the document object
        this.$container = $('.js_wrapper');
        this.$addRowButton = $(".custom-menu").find('*[data-action="add_row"]');
        this.$addColumnButton = $(".custom-menu").find('*[data-action="add_column"]');
        this.$deleteRowButton = $(".custom-menu").find('*[data-action="delete_row"]');
        this.$deleteColumnButton = $(".custom-menu").find('*[data-action="delete_column"]');

        return this;
    },

    createContextMenu: function() {

        $('.js_wrapper').bind("contextmenu", function(event) {

            // Avoid the real one
            event.preventDefault();

            // Show contextmenu
            $(".custom-menu").finish().toggle(100).css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
        });


        // If the document is clicked somewhere
        $(document).bind("mousedown", function(e) {
            console.log('clicked');

            // If the clicked element is not the menu
            if ($(e.target).parents(".custom-menu").length === 0) {

                // Hide it
                $(".custom-menu").hide(100);
            }
        });


        // If the menu element is clicked
        $(".custom-menu li").click(function() {

            // This is the triggered action name
            switch ($(this).attr("data-action")) {

                // A case for each action. Your actions here
                // This entirely handled by the EventDispatcher and Controller
                case "add_row":
                    console.log('Context menu item clicked.');
                    break;
                case "add_column":
                    console.log('Context menu item clicked.');
                    break;
                case "delete_row":
                    console.log('Context menu item clicked.');
                    break;
                case "delete_column":
                    console.log('Context menu item clicked.');
                    break;
            }

            // Hide it AFTER the action was triggered
            $(".custom-menu").hide(100);
        });
    },

    setupHandlers: function() {

        this.$addRowButton.on("click", this.addRowButton);
        this.$addColumnButton.on("click", this.addColumnButton);
        this.$deleteRowButton.on("click", this.deleteRowButton);
        this.$deleteColumnButton.on("click", this.deleteColumnButton);
        return this;
    },

    fillSheet: function() {

    },


    /**------ Handlers ------**/
    addRowButton: function() {

    },

    addColumnButton: function() {

    },

    deleteRowButton: function() {

    },

    deleteColumnButton: function() {

    }

};