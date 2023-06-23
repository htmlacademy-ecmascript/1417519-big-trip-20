import BoarderPresenter from './presenter/board-presenter.js';
import PointsModel from './model/model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import { render } from './framework/render.js';
import NewPointBtnView from './view/new-point-btn-view.js';
import PointApiService from './point-api-service.js';
import { OffersModel } from './model/offers-model.js';
import { DestinationsModel } from './model/destination-model.js';
import OffersApiService from './offers-api.js';
import DestinationsApiService from './destination-api.js';


const AUTHORIZATION = 'Basic hwedfS4wwc21sa2q';
const END_POINT = 'https://20.ecmascript.pages.academy/big-tri';

const tripMainElement = document.querySelector('.trip-main');
const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});

const pointsModel = new PointsModel({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const boarderPresenter = new BoarderPresenter({
  container:tripEvents,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});


const filterPresenter = new FilterPresenter({
  container: controlsFilters,
  pointsModel,
  filterModel
});

const newPointBtnComponent = new NewPointBtnView({
  onClick: handleNewPointBtnClick
});

// eslint-disable-next-line no-return-assign
pointsModel.addObserver(() => newPointBtnComponent.element.disabled = !pointsModel.succesed);

function handleNewPointFormClose(){
  newPointBtnComponent.element.disabled = false;
}

function handleNewPointBtnClick(){
  boarderPresenter.createPoint();
  newPointBtnComponent.element.disabled = true;
}


filterPresenter.init();
boarderPresenter.init();
destinationsModel.init();
offersModel.init();
pointsModel.init()
  .finally(() => {
    render(newPointBtnComponent, tripMainElement);
  });

