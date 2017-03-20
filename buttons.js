console.log('hello buttons!');


var pos;
var vel;
var acc;
var sun;
var p1;
var stars = [];
var zoom;
var zoomLevel;

function Sun(r, steps){
  this.pos = createVector(width/2, height/2);
  this.radius = r
  this.steps = steps;

  this.draw = function(){
    for (var i = 0; i < this.steps; i++) {
      var myAlpha = map(i, 0, this.steps, 0, 255);
      noStroke();
      fill(255,255,180,myAlpha)
      ellipse(this.pos.x, this.pos.y, this.radius - i*2, this.radius - i*2)
    }
  }
}

function Planet(x,y,r){
  this.r = r;
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);

  this.move = function(){
    this.pos.add(this.vel);
  }

  this.draw = function(){
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}


function Star(x,y) {
  this.pos = createVector(x,y);
  this.hue = p5.prototype.random(60,255);
  this.step = p5.prototype.random(1,3);

  this.twinkle = function() {

    if (this.hue < 60 || this.hue > 255){
      this.step *= -1;
    }
    this.hue += this.step

  }

  this.draw = function() {
    this.twinkle();
    strokeWeight(2);
    stroke(this.hue);
    noFill();
    point(this.pos.x, this.pos.y)
    //ellipse(this.pos.x, this.pos.y, 100,100)
  }
}


function setup() {
    var canvas = createCanvas(windowWidth, windowHeight * .75);
    canvas.parent("p5canvas");
    // colorMode(HSB);

    pos = createVector(100,100);
    vel = createVector(10,4);
    acc = createVector(0, 5);

    hue = 0;

    blam = document.querySelector('#blam')

    zoom = select('#zoom')
    zoom.input(function(){
      zoomLevel = this.value();
    })

    blam.addEventListener('click', function(){
      console.log('BLAM');
      hue = random(360);
    })


    for (var i = 0; i < 100; i++) {
      var x = random(width)
      var y = random(height)
      var star = new Star(x,y);
      stars.push(star);
    }

    sun = new Sun(75,30);
    p1 = new Planet(width/2, height/2 - 200, 30)

}

function draw() {
    background(0);

    // choose a bunch of random points
    stars.forEach(star => {
      star.draw();
    })

    // draw sun

    var lvl = map(zoomLevel, 0, 100, .5, 1.5)
    scale(lvl)
    // translate(width * lvl, height * lvl)
    sun.draw();


    // draw outline
    strokeWeight(1);
    stroke(40)
    noFill();
    ellipse(width/2, height/2, 400,400)
    p1.draw();

}
