import BoarderPresenter from './presenter/board-presenter.js';
import PointsModel from './model/model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import { render } from './framework/render.js';
import NewPointBtnView from './view/new-point-btn-view.js';

const tripMainElement = document.querySelector('.trip-main');
const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');


const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const boarderPresenter = new BoarderPresenter({
  container:tripEvents,
  pointsModel,
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

function handleNewPointFormClose(){
  newPointBtnComponent.element.disabled = false;
}

function handleNewPointBtnClick(){
  boarderPresenter.createPoint();
  newPointBtnComponent.element.disabled = true;
}

render(newPointBtnComponent, tripMainElement);

filterPresenter.init();
boarderPresenter.init();

