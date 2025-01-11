import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
// scene.background = new THREE.Color( 'white' );

// Ambient light setup
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

//#region  Camera Setup
// Camera setup
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  1,
  1200
);
camera.lookAt(0, 0, 0);
const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);
camera.position.set(0, 0, 200);

//#endregion

//#region Light and Material PlayGround

//#region Lights
function ambientLight(){
  const light = new THREE.AmbientLight("white", 1);
  scene.add(light);
}

function directionalLight(){ //White directional light shining from the top
  const light = new THREE.DirectionalLight("white", 1); //The default position of the target is (0, 0, 0)
  scene.add(light);
}

function hemisphereLight(){ // A light source positioned directly above the scene, with color fading from the sky color to the ground color.
  const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); // can be used for Shadows
  scene.add( light );
}

function pointLight(){ //A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.
  const light = new THREE.PointLight( 0xff0000, 1, 100 );
  light.position.set( 50, 50, 50 );
  scene.add( light );
}

function rectAreaLight(){ //RectAreaLight emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting.
  const width = 10;
  const height = 10;
  const intensity = 1;
  const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
  rectLight.position.set( 5, 5, 0 );
  rectLight.lookAt( 0, 0, 0 );
  scene.add( rectLight )

  const rectLightHelper = new RectAreaLightHelper( rectLight );
  rectLight.add( rectLightHelper );
}

function spotLight(){ // This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.
  const spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 100, 1000, 100 );
  spotLight.map = new THREE.TextureLoader().load( url );

  spotLight.castShadow = true; // If set to true light will cast dynamic shadows

  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  scene.add( spotLight );
}
//#endregion

function boxShape(boxDimentions){
  const boxGeometry = new THREE.BoxGeometry(boxDimentions,boxDimentions,boxDimentions);
  const material = new THREE.MeshBasicMaterial({color: "red"});
  const cube = new THREE.Mesh( boxGeometry, material);
  return cube;
}

function main(boxDimentions){
  const cube = boxShape(boxDimentions);
  scene.add(cube);
}

const boxDimentions = 200;

main(boxDimentions);
//#endregion

//#region  Renderer setup
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.render(scene, camera);
//#endregion

//#region Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.update();
//#endregion

//#region animation
function animate() {
  controls.update();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
//#endregion
