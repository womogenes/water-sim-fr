class Atom {
  constructor(pos, radius, charge, id) {
    this.body = Bodies.circle(pos.x, pos.y, radius, {
      options: {
        density: 1,
        restitution: 0.8,
        slop: 1,
        collisionFilter: {
          group: 0,
          category: 0,
        },
      },
    });
    this.charge = charge;
    this.radius = radius;
    this.id = id;
  }

  display() {
    ellipseMode('center');
    noStroke();
    fill(this.charge > 0 ? '#fffff' : '#ff0000');
    ellipse(this.body.position.x, this.body.position.y, this.radius * 2);

    textAlign('center', 'center');
    fill(this.charge > 0 ? '#000' : '#fff');
    text(this.charge, this.body.position.x, this.body.position.y);
  }
}

export { Atom };
