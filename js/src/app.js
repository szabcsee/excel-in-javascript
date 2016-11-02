$(function () {
     var model = new ExtCelModel(),
         view = new ExtCelView(model),
         controller = new ExtCelController(model, view);
 });