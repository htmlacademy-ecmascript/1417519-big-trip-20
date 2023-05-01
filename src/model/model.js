import { getPoint } from '../mock/point';

const POINT_COUNT = 3;

export default class PointsModel {
  point = Array.from({length: POINT_COUNT},getPoint);

  getPoints(){
    return this.point;
  }
}

