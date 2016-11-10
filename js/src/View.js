/**
 * The View presents the data from the model and listens to the layout Change event to refresh itself when neccessary.
 * Fires events to the controller when any change happens.
 * @param {[type]} model [description]
 */
var ExtCelView = function(model) {
    this.model = model;
    this.updateCellValueEvent = new Event(this);
    this.addRowEvent = new Event(this);
    this.deleteRowEvent = new Event(this);
    this.addColumnEvent = new Event(this);
    this.deleteColumnEvent = new Event(this);
    this.activeCellChangeEvent = new Event(this);

    this.init();
};

ExtCelView.prototype = {

    /**
     * Initialization of the view
     * @return {[type]} [description]
     */
    init: function() {
        this.createSheet();
        this.fillSheet();
        this.setupHandlers();
        this.enable();
        this.createContextMenu();
        this.setupNavigation();
    },

    /**
     * Already existing functional elements in the DOM.
     * @return {[type]} [description]
     */
    createSheet: function() {
        // cache the document object
        this.$container = $('.js_wrapper');
        this.$addRowButton = $(".custom-menu").find('*[data-action="add_row"]');
        this.$addColumnButton = $(".custom-menu").find('*[data-action="add_column"]');
        this.$deleteRowButton = $(".custom-menu").find('*[data-action="delete_row"]');
        this.$deleteColumnButton = $(".custom-menu").find('*[data-action="delete_column"]');

        return this;
    },

    /**
     * Style cells according to their content (numeric or text)
     * @return {[type]} [description]
     */
    renderCell: function() {
        var newValue = event.target.value,
            cell = $(event.target);
        this.checkStyle(cell, newValue);
    },

    /**
     * Evaluate and assign appropriate styling based on the cell's value
     * @param  {[type]} cell  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    checkStyle: function(cell, value) {
        var cell = $(cell);

        // Check if field value is numeric only or not
        if (value.match(/[a-z]/i)) {
            if (cell.hasClass('numberCell')) {
                cell.removeClass('numberCell');
            }
            cell.addClass('textCell');
        } else {
            if (cell.hasClass('textCell')) {
                cell.removeClass('textCell');
            }
            cell.addClass('numberCell');
        }
    },

    /**
     * Setup keyboard navigation
     * @return {[type]} [description]
     */
    setupNavigation: function() {
        $(document).on("keydown", function(e) {
            var field = e.target,
                row,
                index;

            if (e.keyCode === 38) {
                // up
                index = $(field).index();
                row = $(field).parent().prev();
                $(row).children().eq(index).focus();
            } else if (e.keyCode === 40 || e.keyCode === 13) {
                // down
                index = $(field).index();
                row = $(field).parent().next();
                $(row).children().eq(index).focus();
            } else if (e.keyCode === 37) {
                // left
                $(field).prev('.cell').focus();
            } else if (e.keyCode === 39) {
                // right
                $(field).next('.cell').focus();

            }
        });

        return this;
    },

    /**
     * Creates the contextmenu to manipulate rows and columns.
     * @return {[type]} [description]
     */
    createContextMenu: function() {

        $('.cell').on("contextmenu", function(event) {

            // Avoid the real one
            event.preventDefault();

            // Show contextmenu
            $(".custom-menu").finish().toggle(100).css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
        });


        // If the document is clicked somewhere
        $(document).on("mousedown", function(e) {

            // If the clicked element is not the menu
            if ($(e.target).parents(".custom-menu").length === 0) {

                // Hide it
                $(".custom-menu").hide(100);
            }
        });


        // If the menu element is clicked
        $(".custom-menu li").on("click", function() {

            // Hide it AFTER the action was triggered
            $(".custom-menu").hide(100);
        });
    },

    /**
     * Binds the Views function's to the event handlers with the right scope.
     * @return {[type]} [description]
     */
    setupHandlers: function() {
        this.addRowButtonHandler = this.addRowButton.bind(this);
        this.addColumnButtonHandler = this.addColumnButton.bind(this);
        this.deleteRowButtonHandler = this.deleteRowButton.bind(this);
        this.deleteColumnButtonHandler = this.deleteColumnButton.bind(this);
        this.cellClickHandler = this.activeCellHandler.bind(this);
        this.blurCellHandler = this.updateCellValueHandler.bind(this);
        this.layoutUpdateHandler = this.refreshView.bind(this);
        this.cellRenderHandler = this.renderCell.bind(this);

        return this;
    },

    /**
     * Assign functions to various events happening on the UI or fired by the model.
     * @return {[type]} [description]
     */
    enable: function() {

        this.$allCells = $('.cell');
        this.$addRowButton.on("click", this.addRowButtonHandler);
        this.$addColumnButton.on("click", this.addColumnButtonHandler);
        this.$deleteRowButton.on("click", this.deleteRowButtonHandler);
        this.$deleteColumnButton.on("click", this.deleteColumnButtonHandler);
        this.$allCells.on("focus", this.cellClickHandler);
        this.$allCells.on("blur", this.blurCellHandler);
        this.$allCells.on("change", this.cellRenderHandler);
        this.model.layoutUpdate.attach(this.layoutUpdateHandler);

        $(window).on('resize', function(){
            var cells = $('.cell'),
                rows = $('.row'),
                ratio = cells.length/rows.length;

            for (var i = cells.length - 1; i >= 0; i--) {
                $(cells[i]).width( $('.row').first().width() / ratio  - 4  );
            }
        });
        return this;
    },

    /**
     * Main function to set up the excel sheet inside the js wrapper
     * @return {[type]} [description]
     */
    fillSheet: function() {
        var container = $('.js_wrapper'),
            htmlRow,
            htmlCol,
            columns,
            rows,
            cells,
            currentRow;
        //TODO: Remove when server is ready.
        //This makes sure that the hardcoded data is not loaded on refresh but we are working with the current data stored in the model.
        if (this.model.rows.length === 0 || this.model.columns.length === 0) {
            this.model.loadAll();
        }
        columns = this.model.columns;
        rows = this.model.rows;
        cells = this.model.cells;
        rows.sort(this.dynamicSort("rowIndex"));

        //Setup the rows of the Extcel sheet
        for (var i = 0; i <= rows.length - 1; i++) {
            currentRow = rows[i];
            htmlRow = $("<div class='row' rowIndex='" + currentRow.rowIndex + "'rowId='" + currentRow.rowId + "'></div>");
            columns.sort(this.dynamicSort("colIndex"));
            //Setup the columns of the Extcel sheet
            for (var j = 0; j <= columns.length - 1; j++) {
                htmlCell = $('<input type="text" class="cell" data-colid="' + columns[j].colId + '" data-colindex="' + columns[j].colIndex + '" data-rowid="' + currentRow.rowId + '" value="">');
                $(htmlCell).css('width', $('.js_wrapper').width() / columns.length);
                if (currentRow.rowId === 'null' && columns[j].colId === "null") {
                    $(htmlCell).prop('value', '');
                    $(htmlCell).prop('disabled', true);
                    $(htmlCell).addClass('disabled_cell');
                } else if (columns[j].colId === "null") {
                    $(htmlCell).prop('value', currentRow.rowIndex);
                    $(htmlCell).prop('disabled', true);
                    $(htmlCell).addClass('disabled_cell');
                } else if (currentRow.rowId === 'null') {
                    $(htmlCell).prop('value', columns[j].colIndex);
                    $(htmlCell).prop('disabled', true);
                    $(htmlCell).addClass('disabled_cell');

                }
                $(htmlRow).append(htmlCell);
            }
            $(container).append(htmlRow);
        }

        //Fill the sheet with cell values and evaluate them for correct styling
        for (var i = 0; i <= cells.length - 1; i++) {
            var currentCell = $("[data-rowid='" + cells[i].rowId + "'][data-colid='" + cells[i].colId + "']");
            currentCell.val(cells[i].cellValue);
            this.checkStyle(currentCell,currentCell.val());
        }

        return this;

    },

    /**
     * Almost the same as the main fill Sheet function. Fills the container div with the model data and reassign the neccessary event handlers.
     * @return {[type]} [description]
     */
    refreshView: function() {
        $(this.$container).empty();
        this.fillSheet();
        this.$allCells = $('.cell');
        this.$allCells.on("focus", this.cellClickHandler);
        this.$allCells.on("blur", this.blurCellHandler);
        this.$allCells.on("change", this.cellRenderHandler);
        $('.cell').on("contextmenu", function(event) {

            // Avoid the real one
            event.preventDefault();

            // Show contextmenu
            $(".custom-menu").finish().toggle(100).css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
        });

        return this;
    },

    /**
     * Sort function for row and column sorting
     * @param  {[type]} property [description]
     * @return {[type]}          [description]
     */
    dynamicSort: function(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function(a, b) {
            var aInt = parseInt(a[property]),
                bInt = parseInt(b[property]),
                result = (aInt < bInt) ? -1 : (aInt > bInt) ? 1 : 0;

            return result * sortOrder;
        };
    },

    /**
     * This function notifys the Controller about the currently edited cell via an event
     * @return {[type]} [description]
     */
    activeCellHandler: function() {
        var event = arguments[0],
            cell = $(event.target).data();

        this.activeCellChangeEvent.notify({
            colId: cell.colid,
            rowId: cell.rowid,
            cellValue: event.target.value
        });
    },

    /**
     * When a cell is blured this function compares the cell's value with the active cell value.
     * If there are change it notifys the controller about the updated cell.
     * @return {[type]} [description]
     */
    updateCellValueHandler: function() {
        var event = arguments[0],
            cell = $(event.target).data(),
            updatedCell = {
                colId: cell.colid,
                rowId: cell.rowid,
                cellValue: event.target.value
            };

        if (JSON.stringify(updatedCell) !== JSON.stringify(this.model.activeCell)) {
            this.updateCellValueEvent.notify(updatedCell);
        }
    },

    /**------ Context menu Handlers ------**/

    /**
     * Fires the appropriate event
     * and passes on the active row's or column's id from the model's active cell
     */

    addRowButton: function() {
        var currentRow = this.model.activeCell.rowId;
        this.addRowEvent.notify({
            rowId: currentRow
        });
    },

    addColumnButton: function() {
        var currentColumn = this.model.activeCell.colId;
        this.addColumnEvent.notify({
            colId: currentColumn
        });

    },

    deleteRowButton: function() {
        var currentRow = this.model.activeCell.rowId;
        this.deleteRowEvent.notify({
            rowId: currentRow
        });
    },

    deleteColumnButton: function() {
        var currentColumn = this.model.activeCell.colId;
        this.deleteColumnEvent.notify({
            colId: currentColumn
        });
    }

};