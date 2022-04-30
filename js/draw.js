import { get_attraction } from './utils.js';

const draw = () => {
  background(20);

  for (let atom of atoms) {
    atom.display();
  }

  Engine.update(engine);

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      if (atoms[i].id && atoms[i].id === atoms[j].id) continue;

      const force = get_attraction(
        atoms[i].body.position,
        atoms[j].body.position,
        atoms[i].charge,
        atoms[j].charge
      );

      Body.applyForce(atoms[i].body, atoms[j].body.position, force);
      Body.applyForce(atoms[j].body, atoms[i].body.position, force.mult(-1));
    }
  }
};

export { draw };
