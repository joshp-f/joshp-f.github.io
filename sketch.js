var particles = []

function setup() {
    createCanvas(600,400)
    for (var i = 0; i < 50; i++){
        particles.push({pos:createVector(random(0,width),random(0,height)),vel:createVector(0,0)});
    }
}

function draw() {
    for(var i = 0; i < particles.length; i++){
        var centre = createVector(width/2,height/2);
        var diff = p5.Vector.sub(centre,particles[i].pos).mult(0.001);
        particles[i].vel = p5.Vector.add(diff,particles[i].vel);
        particles[i].vel.mult(0.99);
        /*
        if (particles[i].pos.x < 100){
            particles[i].vel.x += 0.1;
        }
        else if(width - particles[i].pos.x < 100){
            particles[i].vel.x -= 0.1;
        }
        if (particles[i].pos.y < 100){
            particles[i].vel.y += 0.1;
        }
        else if(height - particles[i].pos.y < 100){
            particles[i].vel.y -= 0.1;
        }
        */
        for(var j = 0; j < particles.length; j++){
            if(i != j){
                var diff = p5.Vector.sub(particles[i].pos,particles[j].pos)
                diff.setMag(1/diff.mag());
                    particles[i].vel = p5.Vector.add(diff,particles[i].vel);
                if(i == 0){
                    particles[i].vel.x = 20;
                    particles[i].vel.y = 20;
                    if(particles[i].pos.x > width){
                        particles[i].pos.x = 0;
                    }
                    if(particles[i].pos.y > height){
                        particles[i].pos.y = 0;
                    }
                }
                
            }
       }
    }
  for(var i = 0; i < particles.length; i++){
    particles[i].pos.x += particles[i].vel.x*0.5;
    particles[i].pos.y += particles[i].vel.y*0.5;
    noStroke();
    fill(pow(particles[i].vel.mag(),2)*10,particles[i].pos.x,particles[i].pos.y);
    ellipse(particles[i].pos.x,particles[i].pos.y, 20,20);
  }
}

function mousePressed(){
    for(var i = 0; i < particles.length; i++){
        var mdiff = p5.Vector.sub(particles[i].pos, createVector(mouseX,mouseY));
        mdiff.setMag(1/mdiff.mag()*30);
        particles[i].vel = p5.Vector.add(mdiff,particles[i].vel);
    }
}