const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");

menu.addEventListener("click", function(){
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
})

const particles = [];
function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0,0);
    canvas.style("z-index", "-1");
    const particlesLength = Math.floor(window.innerWidth/10);
    
    for(let i = 0; i < particlesLength; i++){
        particles.push(new Particle());
    }
    noStroke();
}

function draw() {
    background(156,142,95);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
    });
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

class Particle {
    constructor(){
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1,1),random(-3,-0.2));
        this.shrink = random(0.7,0.9);
        this.size = random(300,400) + this.shrink*((height - this.pos.y)/this.vel.y);
    }

    update(){
        this.pos.add(this.vel);
        this.size-=this.shrink;

        if ((this.pos.y<-this.size) || (this.size<=0)){
            this.respawn();
        }
        if (this.pos.x<-this.size){
            this.pos.x = width+this.size;
        }
        if (this.pos.x>width+this.size){
            this.pos.x = -this.size;
        }
    }

    respawn() {
        this.size = random(300,400);
        this.vel = createVector(random(-1,1),random(-3,-0.2));
        this.pos = createVector(random(width), random(height+100,height+300));
        this.shrink = random(0.5,0.8);
    }

    draw() {
        fill(135,123,82);
        circle(this.pos.x,this.pos.y,this.size);
    }
}