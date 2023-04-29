import FilterView from './view/filter-view.js';
import TripInfo from './view/trip-info-view.js';
import BoarderPresenter from './presenter/board-presenter.js';
import {render} from './render.js';

const tripMain = document.querySelector('.trip-main');
const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(new TripInfo(),tripMain,'afterbegin');
render(new FilterView(), controlsFilters);

const boarderPresenter = new BoarderPresenter({container:tripEvents});
boarderPresenter.init();
