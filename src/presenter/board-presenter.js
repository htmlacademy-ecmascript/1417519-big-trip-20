import SortView from '../view/sort-view.js';
import TripEventList from '../view/waypoint-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info-view.js';
import NoPointView from '../view/list-empty-view.js';
import PointPresentor from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../consts.js';
import { sortPointDay,sortPointEvent,sortPointTime,sortPointPrice,sortPointOFFER} from '../utils/point.js';
const tripMain = document.querySelector('.trip-main');


export default class BoarderPresenter {
  #container = null;
  #pointsModel = null;

  #eventListComponent = new TripEventList();

  #sortComponent = null;
  #noPointComponent = new NoPointView();


  #boardPoints = [];
  #pointsOffers = [];
  #pointsDestinations = [];

  #pointPresenters = new Map();

  #currentSortType = SortType.DEFAULT;
  #sourcedBoardTasks = [];

  constructor({container,pointsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init(){
    this.#boardPoints = [...this.#pointsModel.points];
    this.#pointsOffers = [...this.#pointsModel.offers];
    this.#pointsDestinations = [...this.#pointsModel.destinations];

    this.#sourcedBoardTasks = [...this.#pointsModel.points];
    this.#renderSort();
    render(new TripInfo(),tripMain,'afterbegin');
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedTask) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedTask);
    this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
    this.#pointPresenters.get(updatedTask.point.id).init(updatedTask);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.SORT_DAY:
        this.#boardPoints.sort(sortPointDay);
        break;
      case SortType.SORT_EVENT:
        this.#boardPoints.sort(sortPointEvent);
        break;
      case SortType.SORT_TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      case SortType.SORT_PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
      case SortType.SORT_OFFER:
        this.#boardPoints.sort(sortPointOFFER);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardTasks];
    }
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }
    this.#sortPoints(sortType);
    this.#clearTaskList();
    for(let i = 0; i < this.#boardPoints.length; i++){
      this.#renderPoint({point: this.#boardPoints[i],offer: this.#pointsOffers,
        destination:this.#pointsDestinations});
    }
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
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

