/**
 * The model containing all data for the rows, columns and cell values.
 * Also containes the current active cell and its events.
 */
var ExtCelModel = function() {
    this.cells = [];
    this.rows = [];
    this.columns = [];
    this.activeCell = {};
    this.layoutUpdate = new Event(this);
};

/**
 * [prototype description]
 * @type {Object}
 */
ExtCelModel.prototype = {

    getId: function() {
        return Math.floor(Math.random() * 26) + Date.now();
    },
    /**
     * Loads all data to the model (cell values,rows,columns) from JSON input.
     * @return {[type]} [description]
     */
    loadAll: function() {
        var model = this,
            json = '{"data":{"cells":[{"colId":"1","rowId":"13","cellValue":"ABCD"},{"colId":"2","rowId":"2","cellValue":"EFGH"},{"colId":"3","rowId":"5","cellValue":"IJKLM"},{"colId":"6","rowId":"6","cellValue":"NOPQRST"},{"colId":"8","rowId":"8","cellValue":"UVX"},{"colId":"6","rowId":"2","cellValue":"YZ"}],"rows":[{"rowId":"1","rowIndex":"1"},{"rowId":"2","rowIndex":"2"},{"rowId":"3","rowIndex":"3"},{"rowId":"4","rowIndex":"4"},{"rowId":"5","rowIndex":"5"},{"rowId":"6","rowIndex":"6"},{"rowId":"7","rowIndex":"7"},{"rowId":"8","rowIndex":"8"},{"rowId":"9","rowIndex":"9"},{"rowId":"10","rowIndex":"10"},{"rowId":"11","rowIndex":"11"},{"rowId":"12","rowIndex":"12"},{"rowId":"13","rowIndex":"13"}],"columns":[{"colId":"1","colIndex":"1"},{"colId":"2","colIndex":"2"},{"colId":"3","colIndex":"3"},{"colId":"4","colIndex":"4"},{"colId":"5","colIndex":"5"},{"colId":"6","colIndex":"6"},{"colId":"7","colIndex":"7"},{"colId":"8","colIndex":"8"},{"colId":"9","colIndex":"9"},{"colId":"10","colIndex":"10"},{"colId":"11","colIndex":"11"},{"colId":"12","colIndex":"12"},{"colId":"13","colIndex":"13"}]}}';
        obj = JSON.parse(json),
            data = obj.data;

        for (var i = 0; i <= data.cells.length - 1; i++) {
            model.cells.push(data.cells[i]);
        }
        model.rows.push({
            'rowId': 'null',
            'rowIndex': '0'
        });
        for (var i = 0; i <= data.rows.length - 1; i++) {
            model.rows.push(data.rows[i]);
        }
        model.columns.push({
            'colId': 'null',
            'colIndex': '0'
        });
        for (var i = 0; i <= data.columns.length - 1; i++) {
            model.columns.push(data.columns[i]);
        }
    },

    /**
     * adds given cell value to the Model's 'store'.
     * @param {[type]} cell [description]
     */
    addCellValue: function(cell) {
        this.cells.push({
            rowId: cell.rowId,
            colId: cell.colId,
            cellValue: cell.cellValue
        });
        //TODO: Ajax POST Cell
    },

    /**
     * updates the given cell value or deletes it from the Model's store if the value field is empty.
     * @param  {[type]} cell [description]
     * @return {[type]}      [description]
     */
    updateCellValue: function(cell) {
        var existingCell = $.grep(this.cells, function(e) {
                return (e.rowId == cell.rowId && e.colId == cell.colId);
            })[0],
            index = this.cells.indexOf(existingCell);

        if (index !== -1) {
            if (cell.cellValue !== "") {
                this.cells[index] = cell;
                //TODO: Ajax PUT Cell
            } else {
                this.cells.splice(index, 1);
                //TODO: Ajax DELETE Cell
            }
        } else if (index === -1 && cell.cellValue !== "") {
            this.addCellValue(cell);
        }
    },

    /**
     * Updates the Model's active cell with the given cell object.
     * @param  {[type]} cell [description]
     * @return {[type]}      [description]
     */
    updateCurrentCell: function(cell) {
        this.activeCell = cell;
    },

    /**
     * Adds a new row to the Model adjust the affected row indexes and notify's the view.
     * @param {[type]} rowId [description]
     */
    addRow: function(rowId) {
        var currentRow = $.grep(this.rows, function(e) {
                return (e.rowId == rowId);
            })[0],
            currentIndex = currentRow.rowIndex;

        for (var k = 0; k <= this.rows.length - 1; k++) {
            var rowIndex = parseInt(this.rows[k].rowIndex);
            if (rowIndex >= currentIndex) {
                this.rows[k].rowIndex = rowIndex + 1;
            }
        }

        this.rows.push({
            rowId: this.getId(),
            rowIndex: currentIndex
        });
        this.layoutUpdate.notify();
    },

    /**
     * Adds a new column to the Model, adjust the affected columns and notify's the view.
     * @param {[type]} colId [description]
     */
    addColumn: function(colId) {
        var currentColumn = $.grep(this.columns, function(e) {
                return (e.colId == colId);
            })[0],
            currentIndex = currentColumn.colIndex;

        for (var k = 0; k <= this.columns.length - 1; k++) {
            var colIndex = parseInt(this.columns[k].colIndex);
            if (colIndex >= currentIndex) {
                this.columns[k].colIndex = colIndex + 1;
            }
        }

        this.columns.push({
            //TODO: ID gene3ration
            colId: this.getId(),
            colIndex: currentIndex
        });

        this.layoutUpdate.notify();
    },
    /**
     * Deletes an existing row from the Model.
     * @param  {[type]} rowId [description]
     * @return {[type]}       [description]
     */
    deleteRow: function(rowId) {
        var currentRow = $.grep(this.rows, function(e) {
                return (e.rowId == rowId);
            })[0],
            currentIndex = currentRow.rowIndex;

        this.rows.splice(currentIndex, 1);

        for (var k = 0; k <= this.rows.length - 1; k++) {
            if (this.rows[k].rowIndex >= currentIndex) {
                this.rows[k].rowIndex -= 1;
            }
        }

        for(var i = 0; i < this.cells.length; i++) {
                if (this.cells[i].rowId == rowId){
                    this.cells.splice(i, 1);
                }
        }

        this.layoutUpdate.notify();
    },

    /**
     * Deletes an existing column from the Model.
     * @param  {[type]} colId [description]
     * @return {[type]}       [description]
     */
    deleteColumn: function(colId) {
        var currentColumn = $.grep(this.columns, function(e) {
                return (e.colId == colId);
            })[0],
            currentIndex = currentColumn.colIndex;

        this.columns.splice(currentIndex, 1);

        for (var k = 0; k <= this.columns.length - 1; k++) {
            if (this.columns[k].colIndex >= currentIndex) {
                this.columns[k].colIndex -= 1;
            }
        }

        for(var i = 0; i < this.cells.length; i++) {
                if (this.cells[i].colId == colId){
                    this.cells.splice(i, 1);
                }
        }

        this.layoutUpdate.notify();
    },




    /**
     * This will be required for the serverside implementation to load the Model via separate REST services.
     */

    getCells: function() {
        return this.cells;
    },

    getRows: function() {
        return this.rows;
    },

    getColumns: function() {
        return this.columns;
    }

};