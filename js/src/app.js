/*global app, $on */
(function () {
	'use strict';

	/**
	 * Sets up a brand new Sicom ExtCel sheet.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Sheet() {
		this.storage = new app.Store();
		this.model = new app.Model(this.storage);
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view);
	}

	var sheet = new Sheet();

	function setView() {
		sheet.controller.setView(document.location.hash);
	}
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();