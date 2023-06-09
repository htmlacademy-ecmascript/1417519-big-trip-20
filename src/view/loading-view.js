import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate() {
  return (
    `<p class="board__no-points">
      Loading...
    </p>`
  );
}

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
