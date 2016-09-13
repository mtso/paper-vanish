$( document ).ready(function() {
  
  var canvas = document.getElementById('myCanvas');
  paper.setup(canvas);

  paper.view.viewSize = new paper.Size(600, 600);

  var raster = new paper.Raster('cover');
  raster.position = new paper.Point(150, 150);
  raster.scale(0.5);

  var circle = new paper.Path.Circle(new paper.Point(200, 200), 50);


  var small = new paper.Path.Circle(new paper.Point(170, 170), 40);

  var moon = circle.unite(small);

  var rect = new paper.Path.Rectangle(new paper.Point(0, 0), paper.view.size);
  // rect.fillColor = 'white';

  var mask = rect.subtract(moon);
  mask.fillColor = 'white';

  var group = new paper.Group({
    children: [mask, raster],
    clipped: true
  });


  // circle.subtract(small);

  // raster.subtract(circle);

  paper.view.draw();

});