import { draw } from './draw.js';
import { Atom } from './Atom.js';
import './mouse.js';

// Globals
window.Vector = p5.Vector;
window.Engine = Matter.Engine;
window.Body = Matter.Body;
window.Bodies = Matter.Bodies;
window.Composite = Matter.Composite;
window.Constraint = Matter.Constraint;
window.Mouse = Matter.Mouse;
window.MouseConstraint = Matter.MouseConstraint;

// Atoms
window.atoms = [];
window.engine = Engine.create({ gravity: { x: 0, y: 0 } });
window.world = engine.world;

window.setup = () => {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('#sketch-container'));

  // Mouse inputs
  window.mouse = Mouse.create(document.querySelector('#sketch-container'));
  window.mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });
  Composite.add(world, mouseConstraint);

  // Camera stuff
  window.camera = {
    toX: 0,
    toY: 0,
    camX: 0,
    camY: 0,
    zoom: 1,
    toZoom: 1,
    xOffset: 0,
    yOffset: 0,
  };
  window.dZoom = 0.5;

  const walls = [
    Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true }), // bottom
    Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true }), // right
    Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true }), // left
    Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true }), // top
  ];
  for (let wall of walls) {
    wall.restitution = 1;
  }
  Composite.add(world, walls);

  /* for (let i = 0; i < 100; i++) {
    const pos = new Vector(random(0, width), random(0, height));
    const a = new Atom(pos, 10, -2, i + 1, '#f00');
    const b = new Atom(
      Vector.add(pos, new Vector(8, 6)),
      6,
      -2,
      i + 1,
      '#ffffff'
    );
    const c = new Atom(
      Vector.add(pos, new Vector(-8, 6)),
      6,
      -2,
      i + 1,
      '#ffffff'
    );

    Body.applyForce(a.body, a.body.position, Vector.random2D().mult(0.01));

    const ab = Constraint.create({
      bodyA: a.body,
      bodyB: b.body,
      length: 10,
    });
    const ac = Constraint.create({
      bodyA: a.body,
      bodyB: c.body,
      length: 10,
    });
    const bc = Constraint.create({
      bodyA: b.body,
      bodyB: c.body,
      length: 15,
    });

    atoms.push(...[b, c, a]);
    Composite.add(world, [a.body, b.body, c.body]);
    Composite.add(world, [ab, ac, bc]);
  } */

  // Some ions
  for (let i = 0; i < 100; i++) {
    const pos = new Vector(random(0, width), random(0, height));
    const a = new Atom(pos, 10, 1, 0, '#f0f');

    atoms.push(a);
    Composite.add(world, a.body);
  }

  for (let i = 0; i < 100; i++) {
    const pos = new Vector(random(0, width), random(0, height));
    const a = new Atom(pos, 10, -1, 0, '#fff');

    atoms.push(a);
    Composite.add(world, a.body);
  }
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = draw;
