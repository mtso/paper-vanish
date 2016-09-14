$( document ).ready(function() {
  
  var canvas = document.getElementById('myCanvas');
  paper.setup(canvas);

  paper.view.viewSize = new paper.Size(300, 300);

  var raster = new paper.Raster('cover');
  raster.position = paper.view.center;// new paper.Point(150, 150);
  // raster.scale(0.5);


  const particles = 10;
  var circles = new paper.Path.Circle();

  for (var i = 0; i < particles; i++) {
    var x = Math.random() * paper.view.size.width | 0;
    var y = Math.random() * paper.view.size.height | 0;

    var newCircle = new paper.Path.Circle(new paper.Point(x, y), 30);
    circles = circles.unite(newCircle);
  }


  var viewRect = new paper.Path.Rectangle(new paper.Point(0, 0), paper.view.size);
  var mask = viewRect.subtract(circles);
  // mask.fillColor = 'white';

  var group = new paper.Group({
    children: [mask, raster],
    clipped: true
  });

  paper.view.draw();

});