import * as THREE from 'three';
import { clickableButtonInnerHtml } from "./constants";
import { Camera } from "./camera";
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { Css2DRenderer } from './css2dRenderer';
import { WebGlRenderer } from './webGlRenderer';
import { Scene } from './scene';
import { LightCreater } from './lightCreater';
import { Helpers } from './helpers';
import dat from 'dat.gui';
import gsap from 'gsap';

const gui = new dat.GUI();

const scene = new Scene().scene;

const camera = new Camera().camera;
camera.position.setZ(50)

/* CSS Renderer */
const cRenderer = new Css2DRenderer().renderer;

/* WebGl Renderer */
const wRenderer = new WebGlRenderer().renderer;

const pointLight = new LightCreater().createPointLight(scene, true, 0xffffff, 100, 0);
pointLight.castShadow = true;
pointLight.position.z = 30;

/* Helpers */
new Helpers().addOrbitControls(camera, wRenderer.domElement);
new Helpers().addGrid(scene, 50, 50);
new Helpers().addAxes(50, scene, true)

/* WebGl Objects */
const sphereGeometry = new THREE.SphereGeometry(20, 100, 100);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x3498DB,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.z = 1;
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

const boxGeo = new THREE.BoxGeometry(50, 50, 50);
const boxMat = new THREE.MeshBasicMaterial({ color: 0x717D7E });
const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);
box.position.set(80, 0, 80);

/* CSS Objects */
const div = document.createElement('div');
div.classList.add('scene-element-object', "scene-button");
div.innerHTML = clickableButtonInnerHtml
div.style.width = '50px';
div.style.height = '50px';
div.style.fontSize = '15px';

div.addEventListener('pointerenter', () => {
    gsap.to(div.children[0], { drawSVG: '100%' }, { duration: 1, drawSVG: '50% 50%', stagger: 0.1 })
})
div.addEventListener('pointerdown', () => {

    sphere.material.color.set('#AF7AC5');
})
const divObj = new CSS2DObject(div);
sphere.add(divObj);

divObj.position.copy(sphere.position);
divObj.position.z = 20;

// const frustum = new THREE.Frustum();
const raycaster = new THREE.Raycaster();

const labels = [divObj];
const objects = [sphere, box];

const animate = () => {
    requestAnimationFrame(animate);
    // frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

    labels.forEach(label => {
        label.getWorldPosition(raycaster.ray.origin);
        const rd = camera.position.clone().sub(raycaster.ray.origin).normalize();
        raycaster.ray.direction.set(rd.x, rd.y, rd.z);

        const objectsWithoutLabelParent = objects.filter(o => o.uuid !== label.parent.uuid);
        const hits = raycaster.intersectObjects(objectsWithoutLabelParent);
        if (hits.length > 0) divObj.visible = false;
        else divObj.visible = true
    });

    // const labelScale = camera.position.z * 0.1;
    // if (!frustum.containsPoint(sphere.position)) {
    //     divObj.element.style.visibility = 'hidden';
    // } else {
    //     divObj.element.style.visibility = 'visible';
    // }

    wRenderer.render(scene, camera);
    cRenderer.render(scene, camera);
};

animate();