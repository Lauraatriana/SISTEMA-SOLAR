const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Creamoa la forma (geometría) de nuestro objeto
const solGeo = new THREE.SphereGeometry(5, 32, 16);
const planetaGeo = new THREE.SphereGeometry(1, 32, 16);
const lunaGeo = new THREE.SphereGeometry(0.3, 16, 8);

// Definimos los matreiales a usar (Planetas) y sus caracteristicas
const materialSol = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const materialMercurio = new THREE.MeshBasicMaterial({ color: 0xF5C527 });
const materialTierra = new THREE.MeshBasicMaterial({ color: 0x278BF5 });
const materialMarte = new THREE.MeshBasicMaterial({ color: 0xF52727 });
const materialLuna = new THREE.MeshBasicMaterial({ color: 0xF2E1E1 });

// Creamos el objeto con las geometrías y los materiales que creamos anteriormente 
const Sol = new THREE.Mesh(solGeo, materialSol);
const Mercurio = new THREE.Mesh(planetaGeo, materialMercurio);
const Tierra = new THREE.Mesh(planetaGeo, materialTierra);
const Marte = new THREE.Mesh(planetaGeo, materialMarte);
const Luna = new THREE.Mesh(lunaGeo, materialLuna);

// Añadimos las escenas
scene.add(Sol);
scene.add(Mercurio);
scene.add(Tierra);
scene.add(Marte);
scene.add(Luna);

// Definimos la posición de la camara
camera.position.z = 30;

//creamos la animación
let t = 0; // Esta variable será la base de movimiento circular, es decir, entre mayor sea este se desplaza más (posicion)

function animate() {
  t += 0.01;

  // hacemos que el sol gire en su propio eje
  Sol.rotation.y += 0.01;

  // Creamos las orbitas de los planetas con las funciones trigonometricas sen y cos para que sea un movimiento circular.
  Mercurio.position.x = 8 * Math.cos(t * 2); // t*2 hace que este planeta tenga mas velocidad que los otros
  Mercurio.position.z = 8 * Math.sin(t * 2);

  Tierra.position.x = 14 * Math.cos(t);// Aumentamos el radio para que se vea mas lejos del sol y le deja la misma velocidad inicial
  Tierra.position.z = 14 * Math.sin(t);

  Marte.position.x = 20 * Math.cos(t * 0.7);// Aumentamos más el radio y hace que marte sea más lento
  Marte.position.z = 20 * Math.sin(t * 0.7);

  // Creamos la posición de la luna, pero esta gira entorno a la tierra por eso llamamos al planeta y le sumamos el radio y la velocidad de rotacion de la luna.
  Luna.position.x = Tierra.position.x + 2 * Math.cos(t * 5);
  Luna.position.z = Tierra.position.z + 2 * Math.sin(t * 5);

  // Renderizamos
  renderer.render(scene, camera);
}


