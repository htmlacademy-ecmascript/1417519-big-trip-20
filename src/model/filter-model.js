import { FilterType } from '../consts.js';
import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }


  setFilter(UpdateType, filter){
    this.#filter = filter;
    this._notify(UpdateType, filter);
  }
}
