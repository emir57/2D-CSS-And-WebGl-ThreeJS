import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { Camera } from './camera';

export class Css2DRenderer {

    constructor() {
        this.createRenderer();
    }

    createRenderer() {
        const sizes = new Camera().sizes;
        this.css2dRenderer = new CSS2DRenderer();
        this.css2dRenderer.setSize(sizes.width, sizes.height);

        this.css2dRenderer.domElement.classList.add('css-renderer');
        this.css2dRenderer.domElement.classList.add('renderer');
        document.body.appendChild(this.css2dRenderer.domElement);
    }

    get renderer() {
        return this.css2dRenderer;
    }
}