
class CustomButton extends HTMLElement {
  constructor() {
    super()
  }
  static get observedAttributes() {
    return ['open']
  }

  get open() {
    return this.hasAttribute('open');
  };

  set open(isOpen) {
    if (isOpen) {
      this.innerHTML = 'Close'
      this.setAttribute('open', isOpen);
    } else {
      this.innerHTML = 'Open'
      this.removeAttribute('open');
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
  }

  connectedCallback() {
    const modalEvent = new CustomEvent('openModal', { bubbles: true })
    this.innerHTML = 'Close'
    this.addEventListener('click', () => {
      this.dispatchEvent(modalEvent);
      this.togglDrawer()
    })
  }

  disconnectedCallback() {
    this.removeEventListener('click');
  }

  togglDrawer() {
    console.log('toggling button')
    this.open = !this.open
  }
};

window.customElements.define('custom-button', CustomButton)
