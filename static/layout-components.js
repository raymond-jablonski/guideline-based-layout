import { Guide, Container } from '../src/layout-components.js'

// Define the custom element using the customElements API
window.customElements.define('container-element', Container)
window.customElements.define('frame-element', Frame)
window.addEventListener("resize", e => Container.handleResize())