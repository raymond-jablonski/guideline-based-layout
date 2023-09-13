import { Guide, Container } from '../src/layout-components.js'

// Define custom elements
window.customElements.define('container-element', Container)
window.customElements.define('guide-element', Guide)
window.addEventListener("resize", e => Container.handleResize())