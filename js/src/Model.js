var ExtCelModel = function () {
     this.cells = [];
	 this.rows = [];
	 this.columns = [];
	 this.addCellValueEvent = new Event(this);
	 this.addRowEvent = new Event(this);
	 this.addColumnEvent = new Event(this);
	 this.deleteRowEvent = new Event(this);
	 this.deleteColumnEvent = new Event(this);
	 this.deleteCellValueEvent = new Event(this);
	 this.updateCellValueEvent = new Event(this);

 };

 ExtCelModel.prototype = {

     addCellValue: function (cell) {
         this.cells.push({
             rowId: cell.rowId,
             columnId: cell.ColumnId,
			 value: cell.value
         });

         this.addCellValueEvent.notify();
     },

	 updateCellValue: function(cell) {

        this.updateCellValueEvent.notify();
	 },

     getCells: function () {
         return this.cells;
     },

     deleteCellValue: function (cell) {
        this.deleteCellValueEvent.notify();
     },

	 addRow: function (row) {
		 this.rows.push({
			 id: row.id,
			 index: row.index
		 });
         this.addRowEvent.notify();
	 },

	 removeRow: function (row) {
        this.removeRowEvent.notify();
	 },

	 getRows: function () {
		 return this.rows;
	 },

	 addColumn: function (column) {
		 this.columns.push({
			 id: row.id,
			 index: row.index
		 });
         this.addColumnEvent.notify();
	 },

	 removeColumn: function (column) {
        this.removeColumnEvent.notify();
	 },

	 getColumns: function () {
		 return this.columns;
	 }

 };