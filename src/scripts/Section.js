export default class Section {
  constructor({ items, renderer}, containerSelector){
    this._listItems = items;
    this._container = document.querySelector(containerSelector);
    this.renderer = renderer;
  }

  addItem(element){
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(){
    this._listItems.forEach(item => this.renderer(item));
  }
}
