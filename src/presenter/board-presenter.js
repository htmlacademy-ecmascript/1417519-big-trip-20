import SortView from '../view/sort-view.js';
import TripEventList from '../view/waypoint-list-view.js';
import { render, RenderPosition,remove } from '../framework/render.js';
import TripInfo from '../view/trip-info-view.js';
import NoPointView from '../view/list-empty-view.js';
import PointPresentor from './point-presenter.js';
import { SortType, UpdateType, UserAction,FilterType } from '../consts.js';
import { sortPointDay,sortPointEvent,sortPointTime,sortPointPrice,sortPointOFFER} from '../utils/point.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presentor.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const tripMain = document.querySelector('.trip-main');
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoarderPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #eventListComponent = new TripEventList();
  #loadingComponent = new LoadingView();

  #sortComponent = null;
  #noPointComponent = null;

  #newPointPresenter = null;
  #offersModel = [];
  #destinationsModel = [];

  #pointPresenters = new Map();

  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DEFAULT;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({container,pointsModel, destinationsModel,offersModel,filterModel,onNewPointDestroy}){
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#newPointPresenter = new NewPointPresenter({
      destinationsModel:  this.#destinationsModel,
      offersModel:this.#offersModel,
      pointListContainer:this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
  }

  init(){
    render(new TripInfo(),tripMain,'afterbegin');
    this.#renderBoard();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.SORT_DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.SORT_EVENT:
        return filteredPoints.sort(sortPointEvent);
      case SortType.SORT_TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.SORT_PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortType.SORT_OFFER:
        return filteredPoints.sort(sortPointOFFER);
    }
    return filteredPoints;
  }

  createPoint() {
    this.#currentSortType = SortType.SORT_DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }


  #renderPoint({point}){
    if(!this.#offersModel.offers.length || !this.#destinationsModel.destinations.length){
      return;
    }
    const pointPresenter = new PointPresentor({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    pointPresenter.init({point});
    this.#pointPresenters.set(point.id, pointPresenter);

  }

  #renderPoints(points) {
    for(let i = 0; i < points.length; i++){
      this.#renderPoint({point: points[i]});
    }
  }

  #renderBoard(){
    render(this.#eventListComponent,this.#container);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if(pointCount === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(this.points);
  }

  #clearBoard({resetSortType = false} = {}){
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if(this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if(resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#clearBoard();
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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
}
