var ExtCelModel = function () {
     this.cells = [];
	 this.rows = [];
	 this.columns = [];
	 this.addCellValueEvent = new Event(this);
	 this.addRowEvent = new Event(this);
	 this.removeRowEvent = new Event(this);
	 this.removeColumnEvent = new Event(this);
	 this.addColumnEvent = new Event(this);
	 this.deleteRowEvent = new Event(this);
	 this.deleteColumnEvent = new Event(this);
	 this.deleteCellValueEvent = new Event(this);
	 this.updateCellValueEvent = new Event(this);

 };

 ExtCelModel.prototype = {
	 loadAll: function() {
		 var json = "{'data':{'cells':[{'cellId':'1','rowId':'13','cellValue':'ABCD'},{'cellId':'2','rowId':'2','cellValue':'EFGH'},{'cellId':'3','rowId':'5','cellValue':'IJKLM'},{'cellId':'6','rowId':'6','cellValue':'NOPQRST'},{'cellId':'8','rowId':'8','cellValue':'UVX'},{'cellId':'6','rowId':'2','cellValue':'YZ'}],'rows':[{'rowId':'1','rowIndex':'1'},{'rowId':'2','rowIndex':'2'},{'rowId':'3','rowIndex':'3'},{'rowId':'4','rowIndex':'4'},{'rowId':'5','rowIndex':'5'},{'rowId':'6','rowIndex':'6'},{'rowId':'7','rowIndex':'7'},{'rowId':'8','rowIndex':'8'},{'rowId':'9','rowIndex':'9'},{'rowId':'10','rowIndex':'10'},{'rowId':'11','rowIndex':'11'},{'rowId':'12','rowIndex':'12'},{'rowId':'13','rowIndex':'13'}],'columns':[{'colId':'1','colIndex':'1'},{'colId':'2','colIndex':'2'},{'colId':'3','colIndex':'3'},{'colId':'4','colIndex':'4'},{'colId':'5','colIndex':'5'},{'colId':'6','colIndex':'6'},{'colId':'7','colIndex':'7'},{'colId':'8','colIndex':'8'},{'colId':'9','colIndex':'9'},{'colId':'10','colIndex':'10'},{'colId':'11','colIndex':'11'},{'colId':'12','colIndex':'12'},{'colId':'13','colIndex':'13'}]}}";
	     obj = JSON.parse(json);
		 debugger;
	 },
     addCellValue: function (cell) {
         this.cells.push({
             rowId: cell.rowId,
             colId: cell.colId,
			 cellValue: cell.cellValue
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