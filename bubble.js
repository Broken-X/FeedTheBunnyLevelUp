class Bubble {
  constructor(x, y, r) {
    let options = {
      isStatic: true
    };
    
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    imageMode(CENTER);
    image(bubbleImg, pos.x, pos.y, this.r*2, this.r*2);
    pop();
  }
}
