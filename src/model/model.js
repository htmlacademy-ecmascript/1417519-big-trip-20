import { getOffer,getDestination } from '../mock/point.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../consts.js';


export default class PointsModel extends Observable {
  #pointApiService = null;
  #points = [];

  #offer = getOffer();
  #destination = getDestination();

  constructor({pointApiService}) {
    super();
    this.#pointApiService = pointApiService;

  }

  async init(){
    try{
      const points = await this.#pointApiService.points;
      this.#points = points.map(this.#adaptToClient);

    } catch(err){
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  get points(){
    return this.#points;
  }

  get offers(){
    return this.#offer;
  }

  get destinations(){
    return this.#destination;
  }


  async updatePoint(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update){
    try {
      const response = await this.#pointApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err){
      throw new Error('Cant\'t add point');
    }
  }

  async deletePoint(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t delete unexisting point');
    }
    try {
      await this.#pointApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType);
    } catch(err){
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point){
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: new Date(point['date_to']),
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}

