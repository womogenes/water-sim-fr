const keys = () => {
  if (keyIsDown(48)) {
    // Space
    camera.toZoom = 1;
    camera.toX = 0;
    camera.toY = 0;
  }

  if (keyIsDown(84)) {
    for (let a of atoms) {
      Body.applyForce(a.body, a.body.position, Vector.random2D().mult(0.005));
    }
  }
};

export { keys };
