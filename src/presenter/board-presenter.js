import SortView from '../view/sort-view.js';
import TripEventList from '../view/waypoint-list-view.js';
import CreateFormView from '../view/create-form-view.js';
import TripEventItem from '../view/waipoint-item-view.js';
import {render} from '../render.js';

export default class BoarderPresenter {
  sortComponent = new SortView();
  eventListComponent = new TripEventList();

  constructor({container}){
    this.container = container;
  }

  init(){
    render(this.sortComponent,this.container);
    render(this.eventListComponent,this.container);

    render(new CreateFormView(),this.eventListComponent.getElement());

    for(let i = 0; i < 3; i++){
      render(new TripEventItem(),this.eventListComponent.getElement());
    }
  }
}

