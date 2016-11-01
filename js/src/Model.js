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
     },
	 
	 updateCellValue: function(cell) {
	 	
	 },
	 
     getCells: function () {
         return this.cells;
     },

     deleteCellValue: function (cell) {

     }
	 
	 addRow: function (row) {
		 this.rows.push({
			 id: row.id,
			 index: row.index
		 });
	 },
	 
	 removeRow: function (row) {
	 	
	 },
	 
	 getRows: function () {
		 return this.rows;
	 }
	 
	 addColumn: function (column) {
		 this.columns.push({
			 id: row.id,
			 index: row.index
		 });
	 },
	 
	 removeColumn: function (column) {
	 	
	 },
	 
	 getColumns: function () {
		 return this.columns;
	 }

 };