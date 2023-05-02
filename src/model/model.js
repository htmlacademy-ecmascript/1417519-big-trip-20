import { getPoint,getOffer,getDestination } from '../mock/point';

const POINT_COUNT = 3;

export default class PointsModel {
  point = Array.from({length: POINT_COUNT},getPoint);
  offer = Array.from({length: POINT_COUNT},getOffer);
  destination = Array.from({length: POINT_COUNT},getDestination);

  getPoints(){
    return this.point;
  }

  getOffers(){
    return this.offer;
  }

  getDestinations(){
    return this.destination;
  }
}

