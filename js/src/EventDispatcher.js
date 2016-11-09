/**
 * Event dispatcher provides the communication between the Model View and Controller via Events.
 * The Model fires and event when the layout changed and the View listens to it. Also the View fires various events
 * that are handled by the Controller. The Controller acts directly not firing events.
 * @param {[type]} sender [description]
 */
var Event = function (sender) {
    this._sender = sender;
    this._listeners = [];
};

Event.prototype = {

    /**
     * Subscribe to an event with a function. When the event fires the binded function handles it.
     * @param  {[type]} listener [description]
     * @return {[type]}          [description]
     */
    attach: function (listener) {
        if (listener) {
            this._listeners.push(listener);
        } else {
            console.log('There is a problem with event handling. One or more listener not defined properly.');
        }
    },

    /**
     * Fire's an event.
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    notify: function (args) {
        for (var i = 0; i < this._listeners.length; i += 1) {
            this._listeners[i](this._sender, args);
        }
    }

};