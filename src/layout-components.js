const DefaultProps = {
    container: {
        grow: 'down',
        width: '100%', //expand // fit to sum offsetheight of all inner elements
        height: '100%',
        padding: '0px',
        allowIntersect: false, // true, [],
        onGuide: {
            horizontalGuideline: '0%',
            verticalGuideline: '0%',
            breakBefore: false,
            breakAfter: false,
            guidelineOffset: '0px',
            collapse: false,
        },
    },
    guide: {
        direction: 'right',
        location: {
            top: '0%',
            right: '0%',
        },
        containerOffset: '0%',
        whitespace: '50%', // justify
        padding: {
            before: '10px',
            after: '10px'
        },
        break: {
            nonIntersecting: false,
            distance: '10px',
        },
    }
}

export class Guide extends HTMLElement {
    static defaultProps = DefaultProps.guide
    constructor() {
        
    }
    connectedCallback() {
            
    }
}

export class Container extends HTMLElement {
    static containers = []
    static root = null
    static defaultProps = DefaultProps.container
    static handleResize() {
        console.log('resize')
        if (Container.root) {
            let size = { width: window.innerWidth, height: window.innerHeight }
            Container.root.style.width = `${size.width}px`
            Container.root.style.height = `${size.height}px`

            let currentRow = {
                top: 0,
            }
        }
    }
    constructor() {
        super();
        this.location = null;
        this.childContainers = [];
        this.parentContainer = null;
        this.props = Container.defaultProps
        this.computedProps = {}
    }

    resize(parentBounds) {

    }

    connectedCallback() {
        this.style.display = 'block'
        this.style.overflow = 'scroll'

        function findParentContainer(ele) {
            let parent = ele.parentElement;
            while (parent !== null) {
                if (parent instanceof Container) {
                    return parent;
                }
                parent = parent.parentElement;
            }
            return null;
        }

        function getBounds(ele) {
            const rect = ele.getBoundingClientRect();
            return {
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY,
                width: rect.width,
                height: rect.height,
            };
        }
        this.parentContainer = findParentContainer(this)

        this.location = getBounds(this)

        if (this.parentContainer) {
            this.parentContainer.childContainers.push(this)
        } else {
            Container.root = this
            Container.handleResize()
        }
        Container.containers.push(this)
    }
}