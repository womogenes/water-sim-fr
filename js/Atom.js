class Atom {
  constructor(pos, radius, charge, id, color) {
    this.body = Bodies.circle(pos.x, pos.y, radius, {
      options: {
        density: 1,
        restitution: 0.8,
        collisionFilter: {
          group: -id,
        },
      },
    });
    this.charge = charge;
    this.radius = radius;
    this.id = id;
    this.color = color;

    if (this.charge < 0) this.body.velocity = Vector.random2D().mult(10);

    this.body.collisionFilter.group = -id;
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
