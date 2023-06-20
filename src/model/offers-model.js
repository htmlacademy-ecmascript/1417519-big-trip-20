import { UpdateType } from '../consts';
import Observable from '../framework/observable';

class OffersModel extends Observable{
  #offers = [];
  #offersApiService = null;

  constructor ({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init () {
    try {
      const response = await this.#offersApiService.offers;
      this.#offers = response;
      this._notify(UpdateType.INIT);

    } catch(err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }
}

export {OffersModel};
