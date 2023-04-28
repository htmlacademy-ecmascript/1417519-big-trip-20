import FilterView from './view/filter-view.js';
import TripInfo from './view/trip-info-view.js';
import {render} from './render.js';
import BoarderPresenter from './presenter/board-presenter.js';

const tripMain = document.querySelector('.trip-main');
const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const boarderPresenter = new BoarderPresenter({boardContainer: tripEvents});

render(new TripInfo(),tripMain,'afterbegin');
render(new FilterView(), controlsFilters);

boarderPresenter.init();
