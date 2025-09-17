// Efeito de hover nos botões
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.boxShadow = '0 0 40px #00f2ff';
  });
});

// Cena 3D com Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / (window.innerHeight * 0.8),
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById('particles-container').appendChild(renderer.domElement);

// Redimensionamento responsivo
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / (window.innerHeight * 0.8);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
});

// Criando partículas
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 10); // x
  positions.push((Math.random() - 0.5) * 10); // y
  positions.push((Math.random() - 0.5) * 10); // z
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const positionsArray = particles.attributes.position.array;

const particleMaterial = new THREE.PointsMaterial({
  color: 0x00f2ff,
  size: 0.05,
  transparent: true,
  opacity: 0.8
});

const pointCloud = new THREE.Points(particles, particleMaterial);
scene.add(pointCloud);

// Animação única e completa
function animate() {
  requestAnimationFrame(animate);

  // Movimento vertical das partículas
  for (let i = 0; i < positionsArray.length; i += 3) {
    positionsArray[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
  }
  particles.attributes.position.needsUpdate = true;

  // Rotação do conjunto
  pointCloud.rotation.y += 0.002;
  pointCloud.rotation.x += 0.001;

  renderer.render(scene, camera);
}
animate();
