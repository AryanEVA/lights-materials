import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
// scene.background = new THREE.Color("white");

// Camera setup
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  1,
  1900
);
camera.position.set(0, 50, 900);
camera.lookAt(0, 0, 0);

// Axes helper
// const axesHelper = new THREE.AxesHelper(500);
// scene.add(axesHelper);

//#region Lights
// function ambientLight() {
//   const light = new THREE.AmbientLight("white", 0.3);
//   scene.add(light);
// }

// function directionalLight() {
//   const light = new THREE.DirectionalLight("white", 1);
//   light.castShadow = true;
//   scene.add(light);
// }

// function hemisphereLight() {
//   const light = new THREE.HemisphereLight("white", "green", 1);
//   scene.add(light);
// }

// function pointLight() {
//   const light = new THREE.PointLight("yellow", 400);
//   light.position.set(-800, 100, 10);
//   scene.add(light);

//   const helper = new THREE.PointLightHelper(light, 40);
//   scene.add(helper);
// }

// function rectAreaLight() {
//   const width = 10;
//   const height = 10;
//   const intensity = 1;
//   const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
//   rectLight.position.set(5, 5, 0);
//   rectLight.lookAt(0, 0, 0);
//   scene.add(rectLight);
// }

// function spotLight() {
//   const spotLight = new THREE.SpotLight("blue", 2); 
//   spotLight.position.set(100, 250, 100); // Position the light
//   spotLight.angle = Math.PI / 8; // Angle of the spotlight cone
//   spotLight.penumbra = 0.1; // Softness of the spotlight edges
//   spotLight.decay = 2; // How light intensity diminishes over distance
//   spotLight.distance = 500; // Maximum range of the light

//   // Target the center of the scene
//   spotLight.target.position.set(0, 0, 0);
//   scene.add(spotLight);
//   scene.add(spotLight.target);

//   // Add a helper to visualize the spotlight
//   const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//   scene.add(spotLightHelper);
// }


//#endregion

//#region Materials
// function meshBasicMaterial(color) {
//   return new THREE.MeshBasicMaterial({ color: color, wireframe: false });
// }

// function meshLambertMaterial(color) {
//   return new THREE.MeshLambertMaterial({ color: color, fog: true });
// }

// function meshNormalMaterial() {
//   return new THREE.MeshNormalMaterial();
// }

// function meshPhongMaterial(color) {
//   return new THREE.MeshPhongMaterial({
//     color: color,
//     specular: "gray",
//     shininess: 50,
//     fog: true,
//     emissive: "black",
//   });
// }

// function meshPhysicalMaterial(color) {
//   return new THREE.MeshPhysicalMaterial({ color: color, fog: true });
// }

// function meshStandardMaterial(color) {
//   return new THREE.MeshStandardMaterial({ color: color, metalness: 0.8 });
// }

// function meshToonMaterial(color) {
//   return new THREE.MeshToonMaterial({ color: color });
// }
//#endregion

//#region Comparison Methods
// function compareLights() {
//   const parentObject = new THREE.Object3D();
//   const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
//   const material = meshStandardMaterial("white");
//   const cube = new THREE.Mesh(boxGeometry, material);
//   cube.position.set(0, 0, 0);
//   parentObject.add(cube);

//   // Uncomment one light at a time
//   ambientLight();
//   // directionalLight();
//   // hemisphereLight();
//   // pointLight();
//   // rectAreaLight();
//   spotLight();

//   scene.add(parentObject);
// }

// function compareMaterials() {
//   const parentObject = new THREE.Object3D();
//   compareLights();
//   const materials = [
//     meshBasicMaterial("red"),
//     meshLambertMaterial("blue"),
//     meshNormalMaterial(),
//     meshPhongMaterial("green"),
//     meshPhysicalMaterial("yellow"),
//     meshStandardMaterial("purple"),
//     meshToonMaterial("orange"),
//   ];

//   const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
//   let xOffset = -materials.length * 120;

//   materials.forEach((material) => {
//     const cube = new THREE.Mesh(boxGeometry, material);
//     cube.position.set(xOffset, 0, 0);
//     parentObject.add(cube);
//     xOffset += 120;
//   });

//   // pointLight(); // Consistent lighting
//   scene.add(parentObject);
// }
//#endregion


//#region Directional light & Materials

const light = new THREE.AmbientLight("white",0.5);
// scene.add(light);


//#region  Point Light

const pointLight = new THREE.PointLight("yellow", 800, 200);
pointLight.position.set(50, 80, -10);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
scene.add(pointLightHelper);

//#endregion

//#region directional light

// const directionalLight = new THREE.DirectionalLight("yellow", 10);
// directionalLight.position.set(50, 100, 50);

// directionalLight.castShadow = true;

// // Configure shadow properties
// directionalLight.shadow.mapSize.width = 1024;
// directionalLight.shadow.mapSize.height = 1024;
// directionalLight.shadow.camera.near = 1;
// directionalLight.shadow.camera.far = 150;
// directionalLight.shadow.camera.left = -10;
// directionalLight.shadow.camera.right = 150;
// directionalLight.shadow.camera.top = 100;
// directionalLight.shadow.camera.bottom = -100;

// scene.add(directionalLight);

// // Add a helper to visualize the directional light
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 100);
// scene.add(directionalLightHelper);
// // const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// // scene.add(shadowHelper);
// // Create the floor
//#endregion

//#region spot light
//  const spotLight = new THREE.SpotLight("yellow",400, 400, Math.PI/8);
//  spotLight.position.set(200,200,-100);
//  spotLight.castShadow = true;
//  scene.add(spotLight);
//  const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );

// spotLight.shadow.mapSize.width = 1024; // default
// spotLight.shadow.mapSize.height = 1024; // default
// spotLight.shadow.camera.near = 0.5; // default
// spotLight.shadow.camera.far = 500; // default
// spotLight.shadow.focus = 1;
//#endregion

const floor = new THREE.Shape();
floor.moveTo(0, 0);
floor.lineTo(100, 0);
floor.lineTo(100, 100);
floor.lineTo(0, 100);
floor.lineTo(0, 0);

const extrudeSettings = {
  steps: 1,
  depth: 10,
  bevelEnabled: false,
};

const extrudeFloor = new THREE.ExtrudeGeometry(floor, extrudeSettings);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "gray" });
const floorMesh = new THREE.Mesh(extrudeFloor, floorMaterial);
floorMesh.receiveShadow = true; // Enable shadow receiving

// Create the cube
const cube = new THREE.BoxGeometry(10, 10, 10);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const cubeMesh = new THREE.Mesh(cube, cubeMaterial);
cubeMesh.position.set(50, 30, 30);
// directionalLight.position.set(cubeMesh.position.x, cubeMesh.position.y, cubeMesh.position.z);
// directionalLight.target.position.set(cubeMesh.position.x, cubeMesh.position.y, cubeMesh.position.z);
// scene.add(directionalLight.target);
cubeMesh.castShadow = true; // Enable shadow casting

// Add the cube to the floor
floorMesh.add(cubeMesh);

// Rotate and position the floor
floorMesh.rotation.x -= Math.PI / 2;

// Add the floor to the scene
scene.add(floorMesh);


//#endregion

//#region Renderer setup
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
// function mainComparison() {
//   // Uncomment one to observe
//   // compareLights();
//   compareMaterials();
// }

// mainComparison();
//#endregion
