class DocMenuElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    fetch("/docs/menu.html")
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((text) => {
        const parser = new DOMParser();
        const menu_html = parser.parseFromString(text, "text/html");
        this.append(menu_html.body.children[0].cloneNode(true));
      });
  }
}
customElements.define("docs-menu", DocMenuElement);
