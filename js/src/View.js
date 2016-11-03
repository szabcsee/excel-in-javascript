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
        this.createSheet();
        this.setupHandlers();
        this.enable();
        this.fillSheet();
		this.createContextMenu();
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

        $('.cell').bind("contextmenu", function(event) {
			
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
        this.addRowButtonHandler = this.addRowButton.bind(this);
        this.$addColumnButton.on("click", this.addColumnButton);
        this.$deleteRowButton.on("click", this.deleteRowButton);
        this.$deleteColumnButton.on("click", this.deleteColumnButton);
        return this;
    },

    enable: function() {
        this.$addRowButton.click(this.addRowButtonHandler);

        return this;
    },

    fillSheet: function() {
        var container = $('.js_wrapper'),
            htmlRow,
            htmlCol,
            columns,
            rows,
            cells,
			currentRow;

        this.model.loadAll();

        columns = this.model.columns;
        rows = this.model.rows;
        cells = this.model.cells;
        rows.sort(this.dynamicSort("rowIndex"));
		
		//Setup the rows of the Extcel sheet
        for (var i = 0; i <= rows.length - 1; i++) {
            currentRow = rows[i];
            htmlRow = $("<div class='row' rowId='" + currentRow.rowId + "'></div>");
            columns.sort(this.dynamicSort("colIndex"));
			//Setup the columns of the Extcel sheet
            for (var j = 0; j <= columns.length - 1; j++) {
                	htmlCell = $('<input type="text" class="cell" data-colid="' + columns[j].colId +'" data-rowid="' + currentRow.rowId + '" value="">');
					$(htmlCell).css('width',$('.js_wrapper').width()/columns.length);
					if (currentRow.rowId === 'null' && columns[j].colId === "null") {
						$(htmlCell).prop('value','');
						$(htmlCell).prop('disabled', true);
						$(htmlCell).addClass('disabled_cell');
					}
					else if ( columns[j].colId === "null"){
						$(htmlCell).prop('value',currentRow.rowId);
						$(htmlCell).prop('disabled', true);
						$(htmlCell).addClass('disabled_cell');
					}
                	else if (currentRow.rowId === 'null') {
                		$(htmlCell).prop('value', columns[j].colId);
						$(htmlCell).prop('disabled', true);
						$(htmlCell).addClass('disabled_cell');
						
                	}
				$(htmlRow).append(htmlCell);
            }
            $(container).append(htmlRow);
        }
		
		//Fill the sheet with cell values
		for (var i = 0; i <= cells.length - 1; i++) {
			$( "[data-rowid='" + cells[i].rowId + "'][data-colid='" + cells[i].colId + "']" ).val(cells[i].cellValue);
		}
		
    },

    dynamicSort: function(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function(a, b) {
            var a = parseInt(a[property]),
                b = parseInt(b[property]),
                result = (a < b) ? -1 : (a > b) ? 1 : 0;

            return result * sortOrder;
        };
    },

    /**------ Handlers ------**/
    addRowButton: function() {
        this.addRowEvent.notify({
            task: this.$taskTextBox.val()
        });
    },

    addColumnButton: function() {

    },

    deleteRowButton: function() {

    },

    deleteColumnButton: function() {

    },

    /*------- Events from Dispatcher -----------*/

    addRow: function() {
        alert('Notification from event dispatcher');
    },

};