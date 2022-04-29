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

  for (let i = 0; i < 50; i++) {
    const pos = new Vector(random(0, width), random(0, height));
    const a = new Atom(pos, 10, -2, i);
    const b = new Atom(Vector.add(pos, new Vector(8, 6)), 10, 1, i);
    const c = new Atom(Vector.add(pos, new Vector(-8, 6)), 10, 1, i);

    const ab = Constraint.create({
      bodyA: a.body,
      bodyB: b.body,
      length: 16,
    });
    const ac = Constraint.create({
      bodyA: a.body,
      bodyB: c.body,
      length: 16,
    });
    const bc = Constraint.create({
      bodyA: b.body,
      bodyB: c.body,
      length: 25,
    });

    atoms.push(...[a, b, c]);
    Composite.add(world, [a.body, b.body, c.body]);
    //Composite.add(world, [ab, ac, bc]);
  }
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = draw;
