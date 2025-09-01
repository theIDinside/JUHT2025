class FileElement extends HTMLElement {
    connectedCallback() {
      // Ensure display block for layout
      this.style.display = 'block';
    }
  }
  
  customElements.define('file-element', FileElement);