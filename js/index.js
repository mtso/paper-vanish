$( document ).ready(function() {
  
  var canvas = document.getElementById('myCanvas');
  paper.setup(canvas);

  paper.view.viewSize = new paper.Size(600, 600);

  var raster = new paper.Raster('cover');
  raster.position = new paper.Point(200, 200);
  raster.scale(0.5);


  paper.view.draw();

});