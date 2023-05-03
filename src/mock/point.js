import { getRandomArrayElement } from '../utils';
import { Destinations, Descriptions } from '../consts';


const point = [ {
  'basePrice': 1100,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '3',
  'isFavorite': false,
  'offers': [
    '2'
  ],
  'type': 'taxi',
},
{
  'basePrice': 1300,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '4',
  'isFavorite': true,
  'offers': [
    '1'
  ],
  'type': 'taxi',
},
{
  'basePrice': 1200,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '4',
  'isFavorite': true,
  'offers': [
    '1'
  ],
  'type': 'taxi',
},
{
  'basePrice': 1800,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '11',
  'isFavorite': true,
  'offers': [
    '1'
  ],
  'type': 'taxi',
},
];

const moreOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Choose seats',
        price: 150
      },
      {
        id: '2',
        title: 'Add luggage',
        price: 150
      }
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: '5',
        title: 'Switch to comfort class',
        price: 250
      },
      {
        id: '6',
        title: 'Add luggage',
        price: 150
      }
    ]
  },
];

const destinations = [
  {
    id: '3',
    description:getRandomArrayElement(Descriptions),
    name: getRandomArrayElement(Destinations),
    pictures: [
      {
        srс: 'https://loremflickr.com/248/152?random=2',
        description: 'Event photo'
      },
      {
        srс: 'https://loremflickr.com/248/152?random=3',
        description: 'Event photo'
      }
    ]
  },
  {
    id: '4',
    description: getRandomArrayElement(Descriptions),
    name: getRandomArrayElement(Destinations),
    pictures: [
      {
        srс: 'https://loremflickr.com/248/152?random=1',
        description: 'Event photo'
      },
      {
        srс: 'https://loremflickr.com/248/152?random=5',
        description: 'Event photo'
      }
    ]
  },
  {
    id: '4',
    description: getRandomArrayElement(Descriptions),
    name: getRandomArrayElement(Destinations),
    pictures: [
      {
        srс: 'https://loremflickr.com/248/152?random=1',
        description: 'Event photo'
      },
      {
        srс: 'https://loremflickr.com/248/152?random=5',
        description: 'Event photo'
      }
    ]
  },
  {
    id: '11',
    description: getRandomArrayElement(Descriptions),
    name: getRandomArrayElement(Destinations),
    pictures: [
      {
        srс: 'https://loremflickr.com/248/152?random=1',
        description: 'Event photo'
      },
      {
        srс: 'https://loremflickr.com/248/152?random=5',
        description: 'Event photo'
      }
    ]
  }
];


function getPoint(){
  return getRandomArrayElement(point);
}

function getOffer() {
  return getRandomArrayElement(moreOffers);
}

function getDestination() {
  return destinations;
}

export {getPoint, getOffer, getDestination};
