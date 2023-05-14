import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import BoarderPresenter from './presenter/board-presenter.js';
import PointsModel from './model/model.js';

const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const boarderPresenter = new BoarderPresenter({container:tripEvents,pointsModel});

render(new FilterView(), controlsFilters);

boarderPresenter.init();
