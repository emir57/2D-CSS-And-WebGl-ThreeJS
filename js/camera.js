import * as THREE from 'three';

export class Camera {

    sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    constructor() {
        this.createCamera();
    }

    createCamera() {
        this._camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.01, 1000);
    }

    get camera() {
        return this._camera;
    }
}