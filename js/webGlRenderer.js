import * as THREE from 'three';
import { Camera } from "./camera";

export class WebGlRenderer {
    constructor() {
        this.createWebGlRenderer();
    }

    createWebGlRenderer() {
        const sizes = new Camera().sizes;
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this._renderer.setSize(sizes.width, sizes.height);
        this._renderer.setPixelRatio(window.devicePixelRatio);

        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this._renderer.domElement.classList.add('webgl-renderer');
        this._renderer.domElement.classList.add('renderer');
        document.body.appendChild(this._renderer.domElement);
    }

    get renderer() {
        return this._renderer;
    }
}