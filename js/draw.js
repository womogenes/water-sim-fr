import { get_attraction } from './utils.js';
import { keys } from './keyboard.js';

const draw = () => {
  background(20);

  // Camera stuff
  keys();
  camera.camX = lerp(camera.camX, camera.toX, 0.2);
  camera.camY = lerp(camera.camY, camera.toY, 0.2);
  camera.zoom = lerp(camera.zoom, camera.toZoom, 0.2);

  Mouse.setOffset(mouse, {
    x: -camera.camX / camera.zoom,
    y: -camera.camY / camera.zoom,
  });
  Mouse.setScale(mouse, { x: 1 / camera.zoom, y: 1 / camera.zoom });

  push();
  translate(camera.camX, camera.camY);
  scale(camera.zoom);
  for (let atom of atoms) {
    atom.display();
  }
  pop();

  Engine.update(engine);

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      if (atoms[i].id !== 0 && atoms[i].id === atoms[j].id) continue;

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
