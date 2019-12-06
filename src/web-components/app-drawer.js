
let template = document.createElement('template')
template.innerHTML = `
  <slot></slot>
`
class AppDrawer extends HTMLElement {  
  constructor() {
    super()
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.addEventListener('openModal', () => {
      console.log('something happened with modal, lets check it out');
      this.togglDrawer()
    })
  }

  /**
   * Defines attributed to be observed
   */
  static get observedAttributes() {
    return ['open']
  }

  /**
   * Getter for attribute
   */
  get open() {
    return this.hasAttribute('open');
  };

  /**
   * Setter for attribute
   */
  set open(isOpen) {
    if (isOpen) {
      this.setAttribute('open', isOpen);
    } else {
      this.removeAttribute('open');
    }
  }

  /**
   * callback method that listens to changed attributes
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
  }

  /**
   * Adds eventlistener in the initial lifeCycle
   */
  connectedCallback() {
    
    // this.addEventListener('click', () => {
    //   this.togglDrawer()
    // })
  }

  /**
   * Removes eventListener when 
   */
  disconnectedCallback() {
    this.removeEventListener('click');
  }


  /**
   * method to toggle the drawer
   */
  togglDrawer() {
    this.open = !this.open
  }
};

/* registers our element as a custom element */
window.customElements.define('app-drawer', AppDrawer)
