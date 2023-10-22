import * as THREE from 'three';

export class LightCreater {
    constructor() { }

    createPointLight(scene, isHelper, color, intensity, distance, decay) {
        const pointLight = new THREE.PointLight(color, intensity, distance, decay);
        const pointLightHelper = new THREE.PointLightHelper(pointLight);
        if (scene) {
            scene.add(pointLight);
        }
        if (isHelper) {
            scene.add(pointLightHelper);
        }
        return pointLight;
    }
}