class ssrKeep extends HTMLElement {
  get for() {
    return this.getAttribute('for');
  }

  connectedCallback() {
    if (bolt.isServer) {
      return;
    }

    const target = this.closest(this.for);

    if (target) {
      if (!target.ssrKeep) {
        target.ssrKeep = [this];
      } else {
        target.ssrKeep.push(this);
      }
    }
  }
}

if (!window.customElements.get('ssr-keep')) {
  customElements.define('ssr-keep', ssrKeep);
}
