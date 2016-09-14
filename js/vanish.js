
var vanish;
var begin = false;
var timeElapsed = 0;


$( document ).ready(function() {
  
  // loadParticles();

  var canvas = document.getElementById('myCanvas');
  paper.setup(canvas);
  paper.view.viewSize = new paper.Size(300, 300);

  var raster = new paper.Raster('cover');
  raster.position = paper.view.center;
  paper.view.draw();


  const particles = 15;
  const duration = 1.5;

  var totalWidth = paper.view.size.width;
  var circles = [];


  vanish = function() {
    loadParticles();

    // var sx = $(window).width() / 2;
    // var sy = $(window).scrollTop() + $(window).height() / 2;
    // demo.spawn( sx, sy );
    // for ( i = 0; i < 20; i++ ) {
    //     x = ( demo.width * 0.5 ) + random( -100, 100 );
    //     y = ( demo.height * 0.5 ) + random( -100, 100 );
    //     demo.spawn( x, y );
    // }


    while (circles.length > 0) {
      circles.pop();
    }

    for (var i = 0; i < particles; i++) {
      var x = Math.random() * paper.view.size.width | 0;
      var y = Math.random() * paper.view.size.height | 0;
      var noise = Math.random() * (totalWidth / 10) | 0;
      var newCircle = {
        x: x,
        y: y,
        sizeOffset: noise
      }
      circles.push(newCircle);
    }

    begin = true;
    timeElapsed = 0;

    $('#myCanvas').css({ filter: 'brightness(2000%)' });
    setTimeout(function() {
      $('#myCanvas').css({ filter: 'brightness(100%)' });
    }, 40);
  }


  paper.view.onFrame = function(event) {

    if (!begin) { return; }

    timeElapsed += event.delta;
    if (timeElapsed > 5) {// duration) {
      begin = false;

      var viewRect = new paper.Path.Rectangle(new paper.Point(0, 0), paper.view.size);
      var group = new paper.Group({
        children: [viewRect, raster],
        clipped: false
      });

      paper.view.draw();
    }
    else {
      var compositeCircles = new paper.Path.Circle();
      for (var circle of circles) {
        var size = (timeElapsed / duration) * totalWidth + circle.sizeOffset;        
        var circleToAdd = new paper.Path.Circle(new paper.Point(circle.x, circle.y), size);
        compositeCircles = compositeCircles.unite(circleToAdd);
      }
      var viewRect = new paper.Path.Rectangle(new paper.Point(0, 0), paper.view.size);
      var mask = viewRect.subtract(compositeCircles);
      
      var group = new paper.Group({
        children: [mask, raster],
        clipped: true
      });

      paper.view.draw();
    }
  }

});

