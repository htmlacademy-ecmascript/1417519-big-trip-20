import { UpdateType } from '../consts';
import Observable from '../framework/observable';


class DestinationsModel extends Observable{
  #destinations = [];
  #destinationsApiService = null;

  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init () {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
export {DestinationsModel};
