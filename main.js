import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = -1;
camera.position.y = 2.8;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });

// Colouring
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.gammaOutput = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1; // adjust exposure

// Controls for testing
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Shadow map
// create a render target for the shadow map
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let envmaploader = new THREE.PMREMGenerator(renderer);
let envmap;

new RGBELoader().setPath('textures/').load('studio_small_09_4k.hdr', function(hdrmap) {
    envmap = envmaploader.fromCubemap(hdrmap);
});

const loader = new GLTFLoader();

loader.load('./models/scene.glb', function(gltf) {
    scene.add(gltf.scene);

    // const lights = scene.children.filter(child => child.isLight);
    // lights.forEach((light) => {
    //     console.log(`Light type: ${light.type}`);
    //     console.log(`Color: ${light.color.getHex()}`);
    //     console.log(`Intensity: ${light.intensity}`);
    //     console.log(`Position: ${light.position.toArray()}`);
    //     // add code here to create Three.js lights based on the exported lighting data
    //     // const pointLight = new THREE.PointLight(light.color.getHex(), 1, 100);
    //     // pointLight.position.set(light.position.toArray()[0], light.position.toArray()[1], light.position.toArray()[2]);
    //     light.intensity = light.intensity * 0.1;
    // });

    scene.traverse((object) => {
        if (object.isMesh) {
            object.receiveShadow = true;
            object.castShadow = true;

            if (object.material.metalness == 1) {
                object.material.envMap = envmap.texture;
            }
            
            // console.log(object);
        }
        if (object.isLight && object.type != 'AmbientLight' && object.type != 'HemisphereLight'&& object.type != 'RectAreaLight') {
            object.intensity = object.intensity * 0.00006;
            object.castShadow = true;
            object.shadow.bias = -0.0001;
            object.shadow.mapSize.width = 1024*2;
            object.shadow.mapSize.height = 1024*2;
            object.shadow.radius = 25;
            object.shadow.blurSamples = 50;
            // console.log(object.position);
            // console.log(object);
        }
    });

}, undefined, function(error) {
    console.error(error);
});



// const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(0, 10, 10);
// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const hemiLight = new THREE.HemisphereLight(0xB6B6B6, 0xB6A68F, 0.5)
scene.add(ambientLight);
// scene.add(hemiLight);

// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 1, 1);
// rectAreaLight.castShadow = true;
// rectAreaLight.position.set(-0.8839109539985657, 5.432421684265137, 1.9483776092529297)
// scene.add(rectAreaLight);


function animate() {
	requestAnimationFrame( animate );
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();