var mic,fft;
let frames = 0;
let intensity = 0;
let pos = {x:100,y:300};
var vel;
var fadein = 255;


function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create an Audio input
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  fft.setInput(mic);
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  vel = createVector(1,1);
}

function draw() {

  vel.rotate(0.002);
  pos.x += vel.x*intensity;
  pos.y += vel.y*intensity;
  if (pos.x > width) vel.x = -abs(vel.x);
  if (pos.x < 0) vel.x = abs(vel.x);
  if (pos.y > height) vel.y = -abs(vel.y);
  if (pos.y < 0) vel.y = abs(vel.y);
  frames++;
  specr = 0.8;
  miclevel1 = mic.getLevel();
  miclevel = miclevel1*255;
  intensity = lerp(intensity, 0,0.1);
  intensity += log(miclevel1*10+1);
  background(miclevel,0.7*(frames/20 % 255 ),0.7*(frames/20 % 255),20);
  fill(pos.x/width*255,pos.y/height*255,50,150);
  ellipse(pos.x,pos.y,miclevel*3,miclevel*3);
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i< spectrum.length*specr ; i++){
    var x = map(i, 0, spectrum.length*specr, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    h *= (1 + x/width)
    fill(spectrum[i],i/spectrum.length*specr*255,255-spectrum[i]); // spectrum is green
    rect(x, height/2-h/2, width / spectrum.length*specr, h )
  }
  fadein = lerp(fadein,0,0.003);
  background(0,0,0,fadein);
}
