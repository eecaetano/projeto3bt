// Efeito de hover nos botões
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.boxShadow = '0 0 40px #00f2ff';
  });
});

// Cena 3D com Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Câmera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / (window.innerHeight * 0.8),
  0.1,
  1000
);
camera.position.z = 5;

// Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Redimensionamento responsivo
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / (window.innerHeight * 0.8);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
});

// Cabeça simulada (esfera)
const headGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const headMaterial = new THREE.MeshStandardMaterial({
  color: 0x00f2ff,
  wireframe: true
});
const head = new THREE.Mesh(headGeometry, headMaterial);
scene.add(head);

// Luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Luz direcional para efeito dramático
const directionalLight = new THREE.DirectionalLight(0x00f2ff, 1);
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);

// Laser scanner (linha vermelha)
const laserMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const laserGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-2, 0, 0),
  new THREE.Vector3(2, 0, 0)
]);
const laser = new THREE.Line(laserGeometry, laserMaterial);
scene.add(laser);

let laserY = -1.5;

// Animação
function animate() {
  requestAnimationFrame(animate);

  // Rotação da cabeça
  head.rotation.y += 0.01;

  // Movimento do laser
  laser.position.y = laserY;
  laserY += 0.02;
  if (laserY > 1.5) laserY = -1.5;

  renderer.render(scene, camera);
}
animate();
