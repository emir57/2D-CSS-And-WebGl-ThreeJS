import * as THREE from 'three';

export class Scene {
    constructor() {
        this.createScene();
    }

    createScene() {
        this._scene = new THREE.Scene();
    }

    get scene() {
        return this._scene;
    }
}