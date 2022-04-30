import { draw } from './draw.js';
import { Atom } from './Atom.js';

// Globals
window.Vector = p5.Vector;
window.Engine = Matter.Engine;
window.Body = Matter.Body;
window.Bodies = Matter.Bodies;
window.Composite = Matter.Composite;
window.Constraint = Matter.Constraint;

// Atoms
window.atoms = [];
window.engine = Engine.create({ gravity: { x: 0, y: 0 } });
window.world = engine.world;

window.setup = () => {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('#sketch-container'));

  Composite.add(world, [
    Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true }), // bottom
    Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true }), // right
    Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true }), // left
    Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true }), // top
  ]);

  for (let i = 0; i < 100; i++) {
    const pos = new Vector(random(0, width), random(0, height));
    const a = new Atom(pos, 10, -2, i + 1, '#f00');
    const b = new Atom(Vector.add(pos, new Vector(8, 6)), 4, 1, i + 1, '#fff');
    const c = new Atom(Vector.add(pos, new Vector(-8, 6)), 4, 1, i + 1, '#fff');

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
  }

  for (let i = 0; i < 10; i++) {
    const pos = new Vector(width / 2 + i * 20, height / 2);
    const a = new Atom(pos, 10, 1, i + 1, '#f0f');

    atoms.push(a);
    Composite.add(world, a.body);
  }

  for (let i = 0; i < 10; i++) {
    const pos = new Vector(width / 2 + i * 20, height / 2 + 20);
    const a = new Atom(pos, 10, -1, i + 1, '#0ff');

    atoms.push(a);
    Composite.add(world, a.body);
  }
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = draw;
