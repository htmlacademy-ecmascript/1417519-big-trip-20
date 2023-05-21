import { render, replace, remove } from '../framework/render.js';
import TripEventItem from '../view/waipoint-item-view.js';
import EditForm from '../view/edit-form-view.js';

export default class PointPresentor {
  #pointListContainer = null;
  #handleDataChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offer = null;
  #destination = null;

  constructor({pointListContainer,onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
  }

  init({point,offer,destination}){
    this.#point = point;
    this.#offer = offer;
    this.#destination = destination;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripEventItem({
      point: this.#point,
      offer:this.#offer,
      destination:this.#destination,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditForm({
      point: this.#point,
      offer:this.#offer,
      destination:this.#destination,
      onFormSubmit:  this.#handleFormSubmit,
    });

    if(prevPointComponent === null || prevPointEditComponent === null){
      render(this.#pointComponent,this.#pointListContainer);
      return;
    }
    if(this.#pointListContainer.contains(prevPointComponent.element)){
      replace(this.#pointComponent,prevPointComponent);
    }
    if(this.#pointListContainer.contains(prevPointEditComponent.element)){
      replace(this.#pointEditComponent,prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy(){
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replaceCardToForm(){
    replace(this.#pointEditComponent,this.#pointComponent);
    document.addEventListener('keydown',this.#escKeyDownHandler);
  }

  #replaceFormToCard(){
    replace(this.#pointComponent,this.#pointEditComponent);
    document.removeEventListener('keydown',this.#escKeyDownHandler);
  }

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({point: {...this.#point, isFavorite: !this.#point.isFavorite},
      offer: this.#offer, destination: this.#destination});
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange({point, offer: this.#offer, destination: this.#destination});
    this.#replaceFormToCard();
  };
}

