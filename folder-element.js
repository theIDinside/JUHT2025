class FileFolder extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const height = this.getAttribute("height") || "200px";

    // Header
    const header = document.createElement("div");
    header.classList.add("header");
    header.textContent = title;

    // Content container
    const content = document.createElement("div");
    content.classList.add("content");
    content.style.height = height;

    // Files
    this.files = Array.from(this.querySelectorAll("file-element"));
    this.innerContainers = [];

    this.files.forEach((file, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("file-inner");
      if (index === this.currentIndex) wrapper.classList.add("active");

      wrapper.innerHTML = file.innerHTML;
      content.appendChild(wrapper);
      this.innerContainers.push(wrapper);
    });

    // Controls if multiple files
    if (this.files.length > 1) {
      const controls = document.createElement("div");
      controls.classList.add("controls");

      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Prev";
      prevBtn.onclick = () => this.showFile(this.currentIndex - 1);

      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.onclick = () => this.showFile(this.currentIndex + 1);

      const indicator = document.createElement("span");
      indicator.textContent = `${this.currentIndex + 1} / ${this.files.length}`;
      this.indicator = indicator;

      controls.appendChild(prevBtn);
      controls.appendChild(indicator);
      controls.appendChild(nextBtn);

      this.controls = controls;
    }

    // Clear original content and append
    this.innerHTML = "";
    this.appendChild(header);
    this.appendChild(content);
    if (this.controls) this.appendChild(this.controls);
  }

  showFile(index) {
    if (
      index < 0 ||
      index >= this.innerContainers.length ||
      index === this.currentIndex
    )
      return;

    this.innerContainers[this.currentIndex].classList.remove("active");
    this.innerContainers[index].classList.add("active");

    this.currentIndex = index;
    if (this.indicator)
      this.indicator.textContent = `${this.currentIndex + 1} / ${
        this.innerContainers.length
      }`;
  }
}

customElements.define("file-folder", FileFolder);
