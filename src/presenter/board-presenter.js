import SortView from '../view/sort-view.js';
import TripEventList from '../view/waypoint-list-view.js';
import { render, RenderPosition,remove } from '../framework/render.js';
import TripInfo from '../view/trip-info-view.js';
import NoPointView from '../view/list-empty-view.js';
import PointPresentor from './point-presenter.js';
import { SortType, UpdateType, UserAction } from '../consts.js';
import { sortPointDay,sortPointEvent,sortPointTime,sortPointPrice,sortPointOFFER} from '../utils/point.js';
const tripMain = document.querySelector('.trip-main');


export default class BoarderPresenter {
  #container = null;
  #pointsModel = null;

  #eventListComponent = new TripEventList();

  #sortComponent = null;
  #noPointComponent = new NoPointView();


  #pointsOffers = [];
  #pointsDestinations = [];

  #pointPresenters = new Map();

  #currentSortType = SortType.DEFAULT;

  constructor({container,pointsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.SORT_DAY:
        return [...this.#pointsModel.points].sort(sortPointDay);
      case SortType.SORT_EVENT:
        return [...this.#pointsModel.points].sort(sortPointEvent);
      case SortType.SORT_TIME:
        return [...this.#pointsModel.points].sort(sortPointTime);
      case SortType.SORT_PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
      case SortType.SORT_OFFER:
        return [...this.#pointsModel.points].sort(sortPointOFFER);
    }
    return this.#pointsModel.points;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType,update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType,update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  init(){
    this.#pointsOffers = [...this.#pointsModel.offers];
    this.#pointsDestinations = [...this.#pointsModel.destinations];

    render(new TripInfo(),tripMain,'afterbegin');
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleSortTypeChange = (sortType) => {

    if(this.#currentSortType === sortType){
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderPoints(points) {
    for(let i = 0; i < points.length; i++){
      this.#renderPoint({point: points[i],offer: this.#pointsOffers,
        destination:this.#pointsDestinations});
    }
  }

  #clearBoard({resetSortType = false} = {}){

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if(this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if(resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }


  #renderPoint({point,offer,destination}){
    const pointPresenter = new PointPresentor({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({point,offer,destination});
    this.#pointPresenters.set(point.id, pointPresenter);

  }

  #renderBoard(){
    render(this.#eventListComponent,this.#container);
    const points = this.points;
    const pointCount = points.length;

    if(pointCount === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(this.points);
  }
}
