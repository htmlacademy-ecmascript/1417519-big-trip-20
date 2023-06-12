import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDateDayMontsTime } from '../utils/point.js';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createEditFormTemplate(tripPoint,tripOffer,tripDestination) {
  const {basePrice,destination, type, dateFrom, dateTo} = tripPoint;
  const dateStart = humanizePointDateDayMontsTime(dateFrom);
  const dateEnd = humanizePointDateDayMontsTime(dateTo);

  const destinationObj = tripDestination.find((dstn)=>dstn.id === destination);
  const offerObj = tripOffer.find((offer)=>offer.type === type);

  const getOffersList = () => {
    const offersList = [];
    for (let i = 0; i < offerObj.offers.length; i++){
      const offer = `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
      <label class="event__offer-label" for="event-offer-train-1">
        <span class="event__offer-title">${offerObj.offers[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offerObj.offers[i].price}</span>
      </label>
    </div>`;
      offersList.push(offer);
    }
    return offersList.join('');
  };

  const getPicturesList = () => {
    const picturesList = [];
    for (let i = 0; i < destinationObj.pictures.length; i++){
      const picture = `
      <img class="event__photo" src="${destinationObj.pictures[i].src}" alt="Event photo">`;
      picturesList.push(picture);
    }
    return picturesList.join('');
  };

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${tripPoint.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${tripPoint.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationObj.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Berlin"></option>
          <option value="Brooklyn"></option>
          <option value="New York"></option>
          <option value="Moscow"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${dateStart}'>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${dateEnd}'>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${getOffersList()}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationObj.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${getPicturesList()}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
}

export default class EditForm extends AbstractStatefulView{
  #offer = null;
  #destination = null;

  #handleDeleteClick = null;
  #handleFormSubmit = null;
  #handleRollupBtn = null;
  #datepicker = null;

  constructor({point,offer,destination,onFormSubmit,onRollupBtn,onDeleteClick}){
    super();
    this.#offer = offer;
    this.#destination = destination;

    this._setState(EditForm.parsePointToState(point));


    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupBtn = onRollupBtn;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();

  }

  get template() {
    return createEditFormTemplate(this._state,this.#offer,this.#destination);
  }

  removeElement(){
    super.removeElement();

    if(this.#datepicker){
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditForm.parsePointToState(point),
    );
  }

  _restoreHandlers = () => {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click',this.#rollupBtnHandler);

    this.element
      .querySelector('form')
      .addEventListener('submit',this.#formSubmitHandler);

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((element) => {
        element.addEventListener('change', this.#typeInputClick);
      });

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputChange);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputChange);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepickerFrom();

    this.#setDatepickerTo();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditForm.parseStateToPoint(this._state));
  };

  #rollupBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtn();
  };

  #typeInputClick = (evt) => {
    evt.preventDefault();

    this.updateElement({
      ...this._state.point,
      type: evt.target.value,
      offers: []
    });
  };

  #destinationInputChange = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#destination
      .find((point)=> point.name === evt.target.value);

    const selectedDestinationId = (selectedDestination)
      ? selectedDestination.id
      : null;

    this.updateElement({

      ...this._state.point,
      destination: selectedDestinationId

    });
  };

  #priceInputChange = (evt) => {
    evt.preventDefault();

    this._setState({

      ...this._state.point,
      basePrice: evt.target.value

    });
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerFrom () {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat:'d/m/y H:i',
        maxDate:this._state.dateTo,
        defaultDate:this._state.dateFrom,
        onChange: this.#startDateChangeHandler
      }
    );
  }

  #setDatepickerTo () {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat:'d/m/y H:i',
        minDate:this._state.dateFrom,
        defaultDate:this._state.dateTo,
        onChange: this.#endDateChangeHandler
      }
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditForm.parseStateToPoint(this._state));
  };

  static parsePointToState(point){
    return {...point};
  }

  static parseStateToPoint(state){
    const point = {...state};
    return point;
  }
}
