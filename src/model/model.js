import { getPoint,getOffer,getDestination } from '../mock/point.js';

const POINT_COUNT = 3;

export default class PointsModel {
  #point = Array.from({length: POINT_COUNT},getPoint);
  #offer = getOffer();
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

