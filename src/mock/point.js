import { getRandomArrayElement } from '../utils';
import { Destinations, Descriptions, WaypointType } from '../consts';


const point = [ {
  'basePrice': 1100,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '3',
  'isFavorite': false,
  'offers': [
    '2'
  ],
  'type': getRandomArrayElement(WaypointType)
},
{
  'basePrice': 1100,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '4',
  'isFavorite': false,
  'offers': [
    '1'
  ],
  'type': getRandomArrayElement(WaypointType)
},
];

const moreOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: 150
      }
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: '2',
        title: 'Switch to comfort class',
        price: 250
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
  return getRandomArrayElement(destinations);
}

export {getPoint, getOffer, getDestination};
