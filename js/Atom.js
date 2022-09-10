class Atom {
  constructor(pos, radius, charge, id, color) {
    this.body = Bodies.circle(pos.x, pos.y, radius, {
      restitution: 1,
      collisionFilter: {
        group: -id,
      },
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
    });
    this.charge = charge;
    this.radius = radius;
    this.id = id;
    this.color = color;
  }

  display() {
    ellipseMode('center');
    noStroke();
    fill(this.color);
    ellipse(this.body.position.x, this.body.position.y, this.radius * 2);

    textAlign('center', 'center');
    fill(this.charge > 0 ? '#000' : '#fff');
    //text(this.charge, this.body.position.x, this.body.position.y);
  }
}

export { Atom };
