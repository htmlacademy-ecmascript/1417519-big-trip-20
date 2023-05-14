import SortView from '../view/sort-view.js';
import TripEventList from '../view/waypoint-list-view.js';
import TripEventItem from '../view/waipoint-item-view.js';
import EditForm from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';
import TripInfo from '../view/trip-info-view.js';
import NoPointView from '../view/list-empty-view.js';

const tripMain = document.querySelector('.trip-main');


export default class BoarderPresenter {
  #container = null;
  #pointsModel = null;

  #sortComponent = new SortView();
  #eventListComponent = new TripEventList();
  #noPointComponent = new NoPointView();


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

    this.#renderList();
  }

  #renderPoint({point,offer,destination}){
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new TripEventItem({
      point,
      offer,
      destination,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown',escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditForm({
      point,
      offer,
      destination,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    });

    function replaceCardToForm(){
      replace(pointEditComponent,pointComponent);
    }

    function replaceFormToCard(){
      replace(pointComponent,pointEditComponent);
    }

    render(pointComponent,this.#eventListComponent.element);
  }

  #renderList(){
    if(this.#boardPoints.length === 0){
      render (this.#noPointComponent,this.#container);
    }else {
      render(new TripInfo(),tripMain,'afterbegin');
      render(this.#sortComponent,this.#container);
    }
    render(this.#eventListComponent,this.#container);

    for(let i = 0; i < this.#boardPoints.length; i++){
      this.#renderPoint({point: this.#boardPoints[i],offer: this.#pointsOffers,
        destination:this.#pointsDestinations});
    }
  }
}

