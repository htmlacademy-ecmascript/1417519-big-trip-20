import SortView from '../view/sort-view.js';
import TripEventList from '../view/waypoint-list-view.js';
import CreateFormView from '../view/create-form-view.js';
import TripEventItem from '../view/waipoint-item-view.js';
import { render } from '../framework/render.js';

export default class BoarderPresenter {
  #container = null;
  #pointsModel = null;

  #sortComponent = new SortView();
  #eventListComponent = new TripEventList();


  #boardPoints = [];
  #pointsOffers = [];
  #pointsDestinations = [];

  constructor({container,pointsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init(){
    this.#boardPoints = [...this.#pointsModel.points];
    this.#pointsOffers = [...this.#pointsModel.offers];
    this.#pointsDestinations = [...this.#pointsModel.destinations];

    render(this.#sortComponent,this.#container);
    render(this.#eventListComponent,this.#container);
    render(new CreateFormView({point: this.#boardPoints[0], offer: this.#pointsOffers,
      destination:this.#pointsDestinations}),this.#eventListComponent.element);

    for(let i = 0; i < this.#boardPoints.length; i++){
      render(new TripEventItem({point: this.#boardPoints[i],offer: this.#pointsOffers,
        destination:this.#pointsDestinations}),this.#eventListComponent.element);
    }
  }
}

