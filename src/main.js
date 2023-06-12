import BoarderPresenter from './presenter/board-presenter.js';
import PointsModel from './model/model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');


const pointsModel = new PointsModel();
const filterModel = new FilterModel();


const boarderPresenter = new BoarderPresenter({
  container:tripEvents,
  pointsModel,
  filterModel
});


const filterPresenter = new FilterPresenter({
  container: controlsFilters,
  pointsModel,
  filterModel
});


filterPresenter.init();
boarderPresenter.init();
