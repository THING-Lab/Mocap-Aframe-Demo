function generateBox() {
  const newBox = document.createElement('a-box');
  const x = Math.random() * 20 - 10;
  const y = Math.random() * 5;
  const z = Math.random() * 20 - 10;

  const euler1 = Math.random() * 360 - 180;
  const euler2 = Math.random() * 180 - 90;
  const euler3 = Math.random() * 360 - 180;

  const sx = Math.random() * 0.75 + 0.1;
  const sy = Math.random() * 0.75 + 0.1;
  const sz = Math.random() * 0.75 + 0.1;

  const r = Math.round(Math.random() * 200) + 50;
  const g = Math.round(Math.random() * 200) + 50;
  const b = Math.round(Math.random() * 200) + 50;

  newBox.setAttribute('position', `${x} ${y} ${z}`);
  newBox.setAttribute('rotation', `${euler1} ${euler2} ${euler3}`);
  newBox.setAttribute('scale', `${sx} ${sy} ${sz}`);
  newBox.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
  return newBox;
}