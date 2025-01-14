import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

// Camera setup
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  1,
  1900
);
camera.lookAt(0, 0, 0);
camera.position.set(0, 0, 900);

// Axes helper
const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

//#region Lights
function ambientLight() {
  const light = new THREE.AmbientLight("white", 0.3);
  scene.add(light);
}

function directionalLight() {
  const light = new THREE.DirectionalLight("white", 1);
  scene.add(light);
}

function hemisphereLight() {
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);
}

function pointLight() {
  const light = new THREE.PointLight("blue", 1, 100, 2);
  light.position.set(-320, 100, 10);
  scene.add(light);

  const helper = new THREE.PointLightHelper(light, 20);
  scene.add(helper);
}

function rectAreaLight() {
  const width = 10;
  const height = 10;
  const intensity = 1;
  const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
  rectLight.position.set(5, 5, 0);
  rectLight.lookAt(0, 0, 0);
  scene.add(rectLight);
}

function spotLight() {
  const spotLight = new THREE.SpotLight("blue", 1); // Light color and intensity
  spotLight.position.set(100, 200, 100); // Position the light
  spotLight.angle = Math.PI / 6; // Angle of the spotlight cone
  spotLight.penumbra = 0.1; // Softness of the spotlight edges
  spotLight.decay = 2; // How light intensity diminishes over distance
  spotLight.distance = 500; // Maximum range of the light

  // Target the center of the scene
  spotLight.target.position.set(0, 0, 0);
  scene.add(spotLight);
  scene.add(spotLight.target);

  // Add a helper to visualize the spotlight
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
}

//#endregion

//#region Materials
function meshBasicMaterial(color) {
  return new THREE.MeshBasicMaterial({ color: color, wireframe: false });
}

function meshLambertMaterial(color) {
  return new THREE.MeshLambertMaterial({ color: color, fog: true });
}

function meshNormalMaterial() {
  return new THREE.MeshNormalMaterial();
}

function meshPhongMaterial(color) {
  return new THREE.MeshPhongMaterial({
    color: color,
    specular: "gray",
    shininess: 50,
    fog: true,
    emissive: "black",
  });
}

function meshPhysicalMaterial(color) {
  return new THREE.MeshPhysicalMaterial({ color: color, fog: true });
}

function meshStandardMaterial(color) {
  return new THREE.MeshStandardMaterial({ color: color, metalness: 0.8 });
}

function meshToonMaterial(color) {
  return new THREE.MeshToonMaterial({ color: color });
}
//#endregion

//#region Comparison Methods
function compareLights() {
  const parentObject = new THREE.Object3D();
  const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
  const material = meshStandardMaterial("white");
  const cube = new THREE.Mesh(boxGeometry, material);
  cube.position.set(0, 0, 0);
  parentObject.add(cube);

  // Uncomment one light at a time
  ambientLight();
  // directionalLight();
  // hemisphereLight();
  // pointLight();
  // rectAreaLight();
  // spotLight();

  scene.add(parentObject);
}

function compareMaterials() {
  const parentObject = new THREE.Object3D();
  compareLights();
  const materials = [
    meshBasicMaterial("red"),
    meshLambertMaterial("blue"),
    meshNormalMaterial(),
    meshPhongMaterial("green"),
    meshPhysicalMaterial("yellow"),
    meshStandardMaterial("purple"),
    meshToonMaterial("orange"),
  ];

  const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
  let xOffset = -materials.length * 120;

  materials.forEach((material) => {
    const cube = new THREE.Mesh(boxGeometry, material);
    cube.position.set(xOffset, 0, 0);
    parentObject.add(cube);
    xOffset += 120;
  });

  pointLight(); // Consistent lighting
  scene.add(parentObject);
}
//#endregion

//#region Renderer setup
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
//#endregion

//#region Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//#endregion

//#region Animation
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
//#endregion

//#region Main Function
function mainComparison() {
  // Uncomment one to observe
  // compareLights();
  compareMaterials();
}

mainComparison();
//#endregion
