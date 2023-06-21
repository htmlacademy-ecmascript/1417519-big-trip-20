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
      const response = await this.#destinationsApiService.destinations;
      this.#destinations = response;
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
