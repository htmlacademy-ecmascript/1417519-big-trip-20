import { getPoint,getOffer,getDestination } from '../mock/point';

const POINT_COUNT = 8;

export default class PointsModel {
  #point = Array.from({length: POINT_COUNT},getPoint);
  #offer = Array.from({length: POINT_COUNT},getOffer);
  #destination = getDestination();

  get points(){
    return this.#point;
  }

  get offers(){
    return this.#offer;
  }

  get destinations(){
    return this.#destination;
  }
}

