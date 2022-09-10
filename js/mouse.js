window.mouseDragged = () => {
  if (mouseConstraint.body !== null) return;
  if (mouseButton !== 'center') return;

  camera.toX = mouseX - camera.xOffset;
  camera.toY = mouseY - camera.yOffset;
};

window.mousePressed = () => {
  if (mouseConstraint.body !== null) return;
  if (mouseButton !== 'center') return;

  camera.xOffset = mouseX - camera.camX;
  camera.yOffset = mouseY - camera.camY;
};

window.mouseWheel = (event) => {
  let e = event.delta;

  if (e < 0) {
    camera.toX -= dZoom * (mouseX - camera.toX);
    camera.toY -= dZoom * (mouseY - camera.toY);
    camera.toZoom *= dZoom + 1;
  } else {
    camera.toX += (dZoom / (dZoom + 1)) * (mouseX - camera.toX);
    camera.toY += (dZoom / (dZoom + 1)) * (mouseY - camera.toY);
    camera.toZoom /= dZoom + 1;
  }
};
