var ExtCelView = function (model) {
    this.model = model;

    this.init();
};

ExtCelView.prototype = {

    init: function () {
        this.createSheet()
        this.setupHandlers()
        this.enable();
    },

    createSheet: function () {
        // cache the document object
        this.$container = $('#js_wrapper');
        this.$addRowButton = this.$container.find('.add_row_button');
        this.$addColumnButton = this.$container.find('.add_column_button');
        this.$deleteRowButton = this.$container.find('.delete_row_button');
		this.$deleteColumnButton = this.$container.find('.delete_column_button');

        return this;
    },

    setupHandlers: function () {

        this.addRowButtonHandler = this.addRowButton.bind(this);
		this.addColumnButtonHandler = this.addColumnButton.bind(this);
		this.deleteRowButtonHandler = this.deleteRowButton.bind(this);
		this.deleteColumnButtonHandler = this.deleteColumnButton.bind(this);
       

        /**
        Handlers from Event Dispatcher
        */
        this.addCellValueEventHandler = this.addCellValueEvent.bind(this);
   	 	this.addRowEventHandler = this.addRowEvent.bind(this);
   	 	this.addColumnEventHandler = this.addColumnEvent.bind(this);
   	 	this.deleteRowEventHandler = this.deleteRowEvent.bind(this);
   	 	this.deleteColumnEventHandler = this.deleteColumnEvent.bind(this);
   	 	this.deleteCellValueEventHandler = this.deleteCellValueEvent.bind(this);
   	 	this.updateCellValueEventHandler = this.updateCellValueEvent.bind(this);
        
        return this;
    },

    enable: function () {

        this.$addTaskButton.click(this.addTaskButtonHandler);
        this.$container.on('click', '.js-task', this.selectOrUnselectTaskHandler);
        this.$container.on('click', '.js-complete-task-button', this.completeTaskButtonHandler);
        this.$container.on('click', '.js-delete-task-button', this.deleteTaskButtonHandler);

        /**
         * Event Dispatcher
         */
        this.model.addTaskEvent.attach(this.addTaskHandler);
        this.model.addTaskEvent.attach(this.clearTaskTextBoxHandler);
        this.model.setTasksAsCompletedEvent.attach(this.setTasksAsCompletedHandler);
        this.model.deleteTasksEvent.attach(this.deleteTasksHandler);

        return this;
    },

    addTaskButton: function () {
        this.addTaskEvent.notify({
            task: this.$taskTextBox.val()
        });
    },

    completeTaskButton: function () {
        this.completeTaskEvent.notify();
    },

    deleteTaskButton: function () {
        this.deleteTaskEvent.notify();
    },

    selectOrUnselectTask: function () {

        var taskIndex = $(event.target).attr("data-index");

        if ($(event.target).attr('data-task-selected') == 'false') {
            $(event.target).attr('data-task-selected', true);
            this.selectTaskEvent.notify({
                taskIndex: taskIndex
            });
        } else {
            $(event.target).attr('data-task-selected', false);
            this.unselectTaskEvent.notify({
                taskIndex: taskIndex
            });
        }

    },

    show: function () {
        this.buildList();
    },

    buildList: function () {
        var tasks = this.model.getTasks();
        var html = "";
        var $tasksContainer = this.$tasksContainer;

        $tasksContainer.html('');

        var index = 0;
        for (var task in tasks) {

            if (tasks[task].taskStatus == 'completed') {
                html += "<div style="color:green;">";
            } else {
                html += "<div>";
            }

            $tasksContainer.append(html + "<label><input type="checkbox" class="js-task" data-index="" + index + "" data-task-selected="false">" + tasks[task].taskName + "</label></div>");

            index++;
        }

    },



    /* -------------------- Handlers From Event Dispatcher ----------------- */

    clearTaskTextBox: function () {
        this.$taskTextBox.val('');
    },

    addTask: function () {
        this.show();
    },

    setTasksAsCompleted: function () {
        this.show();

    },

    deleteTasks: function () {
        this.show();

    }

    /* -------------------- End Handlers From Event Dispatcher ----------------- */