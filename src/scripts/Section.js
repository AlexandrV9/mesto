export default class Section {
  constructor({ renderer }, containerSelector){
    this._container = document.querySelector(containerSelector);
    this.renderer = renderer;
  }

  addItem(element){
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(listItems){
    listItems.forEach(item => this.renderer(item));
  }

}
