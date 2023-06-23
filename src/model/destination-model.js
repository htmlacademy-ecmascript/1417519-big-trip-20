import { UpdateType } from '../consts';
import Observable from '../framework/observable';


class DestinationsModel extends Observable{
  #destinations = [];
  #destinationsApiService = null;
  #succesed = false;
  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get succesed(){
    return this.#succesed;
  }

  async init () {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
      this._notify(UpdateType.INIT);
      this.#succesed = true;

    } catch(err) {
      this.#succesed = false;

      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
export {DestinationsModel};
