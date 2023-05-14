import BoarderPresenter from './presenter/board-presenter.js';
import PointsModel from './model/model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const filterPresenter = new FilterPresenter({
  container: controlsFilters,
  pointsModel
});

const boarderPresenter = new BoarderPresenter({
  container:tripEvents,pointsModel
});

filterPresenter.init();
boarderPresenter.init();
