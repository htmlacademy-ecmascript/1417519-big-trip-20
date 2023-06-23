import { UpdateType } from '../consts';
import Observable from '../framework/observable';

class OffersModel extends Observable{
  #offers = [];
  #offersApiService = null;
  #succesed = false;
  constructor ({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  get succesed(){
    return this.#succesed;
  }

  async init () {
    try {
      this.#offers = await this.#offersApiService.offers;
      this._notify(UpdateType.INIT);
      this.#succesed = true;
    } catch(err) {
      this.#succesed = false;

      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }
}

export {OffersModel};
