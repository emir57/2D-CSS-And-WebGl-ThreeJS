import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Helpers {
    constructor() { }

    addOrbitControls(camera, domElement) {
        const controls = new OrbitControls(camera, domElement);
        return controls;
    }

    addGrid(scene, size, divisions, color1, color2) {
        const gridHelper = new THREE.GridHelper(size, divisions, color1, color2);
        scene.add(gridHelper);
        return gridHelper;
    }

    addAxes(size, scene, isAddScene) {
        const axesHelper = new THREE.AxesHelper(size);
        if (scene && isAddScene) {
            scene.add(axesHelper);
        }
        return axesHelper;
    }
}