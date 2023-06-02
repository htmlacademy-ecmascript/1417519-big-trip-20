const Destinations = [
  'Amsterdam', 'Berlin', 'Brooklyn ', 'New York', 'Moscow', 'Saint Petersburg', 'London', 'Istanbul', 'Madrid'
];

const Descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const FilterType = {
  EVERYTHING:'everything',
  FUTURE:'future',
  PRESENT:'present',
  PAST:'past',
};

const SortType = {
  SORT_DAY: 'sort-day',
  SORT_EVENT: 'sort-event',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price',
  SORT_OFFER: 'sort-offer',
};

export {Destinations,Descriptions,FilterType,SortType};
