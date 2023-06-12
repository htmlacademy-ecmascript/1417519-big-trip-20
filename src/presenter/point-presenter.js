import { render, replace, remove } from '../framework/render.js';
import TripEventItem from '../view/waipoint-item-view.js';
import EditForm from '../view/edit-form-view.js';
import { UpdateType, UserAction } from '../consts.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class PointPresentor {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offer = null;
  #destination = null;

  #mode = Mode.DEFAULT;

  constructor({pointListContainer,onDataChange,onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      onRollupBtn:this.#rollupBtnHandler,
    });

    if(prevPointComponent === null || prevPointEditComponent === null){
      render(this.#pointComponent,this.#pointListContainer);
      return;
    }
    if(this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent,prevPointComponent);
    }
    if(this.#mode === Mode.EDITING){
      replace(this.#pointEditComponent,prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy(){
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm(){
    replace(this.#pointEditComponent,this.#pointComponent);
    document.addEventListener('keydown',this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard(){
    replace(this.#pointComponent,this.#pointEditComponent);
    document.removeEventListener('keydown',this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    document.querySelector('.trip-main__event-add-btn').disabled = true;
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };


  #rollupBtnHandler = () => {
    document.querySelector('.trip-main__event-add-btn').disabled = false;
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      point,
    );
    document.querySelector('.trip-main__event-add-btn').disabled = false;
    this.#replaceFormToCard();
  };
}

