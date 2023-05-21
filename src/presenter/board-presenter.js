import SortView from '../view/sort-view.js';
import TripEventList from '../view/waypoint-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info-view.js';
import NoPointView from '../view/list-empty-view.js';
import PointPresentor from './point-presenter.js';
import { updateItem } from '../utils/common.js';

const tripMain = document.querySelector('.trip-main');


export default class BoarderPresenter {
  #container = null;
  #pointsModel = null;

  #eventListComponent = new TripEventList();

  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();


  #boardPoints = [];
  #pointsOffers = [];
  #pointsDestinations = [];

  #pointPresenters = new Map();

  constructor({container,pointsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init(){
    this.#boardPoints = [...this.#pointsModel.points];
    this.#pointsOffers = [...this.#pointsModel.offers];
    this.#pointsDestinations = [...this.#pointsModel.destinations];

    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedTask) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedTask);
    this.#pointPresenters.get(updatedTask.point.id).init(updatedTask);
  };


  #renderSort() {
    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoTasks() {
    render(this.#noPointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint({point,offer,destination}){
    const pointPresenter = new PointPresentor({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({point,offer,destination});

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderList(){
    if(this.#boardPoints.length === 0){
      this.#renderNoTasks();
    }else {
      render(new TripInfo(),tripMain,'afterbegin');
      this.#renderSort();
    }
    render(this.#eventListComponent,this.#container);

    for(let i = 0; i < this.#boardPoints.length; i++){
      this.#renderPoint({point: this.#boardPoints[i],offer: this.#pointsOffers,
        destination:this.#pointsDestinations});
    }
  }

  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}

