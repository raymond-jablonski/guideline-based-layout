const DefaultProps = {
    container: {
        active: true, // boolean value
        grow: 'down', // string that matches: /^\s*up\s*$/, /^\s*down\s*$/, /^\s*left\s*$/, or /^\s*right\s*$/
        width: '100%', // string that matches: /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/, /^\s*expand\s*$/, or /^\s*fit\s*$/
        height: '100%', // string that matches: /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/, /^\s*expand\s*$/, or /^\s*fit\s*$/
        padding: {
            sibling: '0', // string that matches: /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/ or /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/
            parent: '0', // string that matches: /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/ or /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/
        },
        allowIntersect: false, // boolean value, array of integers that are 0 or greater
        pivot: {
            horizontal: '50%', // string that matches: /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/ or /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/
            vertical: '50%', // string that matches: /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/ or /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/
        },
        guideBehavior: {
            insert: {
                reverseDirection: false, // boolean value
                startOffset: '0' // string that matches: /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/ or /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/
            },
            break: {
                before: false, // boolean value
                after: false // boolean value
            },
            keepWith: {
                previous: false,  // boolean value
                next: false  // boolean value
            },
            breakChildrenBeforeSelf: false, // boolean value
        },
        defaultGuide: {
            horizontal: {},
            vertical: {}
        },
    },
    guide: {
        active: true, // boolean
        direction: 'right', // up, down, left, or right
        location: {
            horizontal: '0', // % or px
            vertical: '0', // % or px
        },
        containerOffset: '0',
        whitespace: '50%', // 'justify'
        padding: {
            before: '10px',
            after: '10px'
        },
        break: {
            encounteringContainer: false,
            rowLike: false,
            spacing: '0', // % or px
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