import { getRandomArrayElement } from '../utils/common.js';
import { Descriptions } from '../consts.js';
import { nanoid } from 'nanoid';


const point = [ {
  'basePrice': 1100,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '2',
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
  'destination': '3',
  'isFavorite': true,
  'offers': [
    '1','2'
  ],
  'type': 'taxi',
},
{
  'basePrice': 1200,
  'dateFrom': '2023-07-22T22:55:56.845Z',
  'dateTo': '2024-07-25T11:22:13.375Z',
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
  'destination': '5',
  'isFavorite': true,
  'offers': [
    '1'
  ],
  'type': 'taxi',
},
];

const moreOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '1',
        'title': 'Order an economy taxi',
        'price': 200
      },
      {
        'id': '2',
        'title': 'Order a comfort class taxi',
        'price': 280
      },
      {
        'id': nanoid(),
        'title': 'Order a business class taxi',
        'price': 350
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order a bus for 10 people',
        'price': 560
      },
      {
        'id': nanoid(),
        'title': 'Order a bus for 30 people',
        'price': 800
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order reserved seat',
        'price': 370
      },
      {
        'id': nanoid(),
        'title': 'Order a seat in coupe',
        'price': 450
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order an economy ship',
        'price': 390
      },
      {
        'id': nanoid(),
        'title': 'Order a comfort class ship',
        'price': 560
      },
      {
        'id': nanoid(),
        'title': 'Order a business class ship',
        'price': 780
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order an economy car',
        'price': 260
      },
      {
        'id': nanoid(),
        'title': 'Order a comfort class car',
        'price': 340
      },
      {
        'id': nanoid(),
        'title': 'Order a business class car',
        'price': 410
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order an economy flight',
        'price': 480
      },
      {
        'id': nanoid(),
        'title': 'Order a comfort class flight',
        'price': 600
      },
      {
        'id': nanoid(),
        'title': 'Order a business class flight',
        'price': 820
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order an economy Check-in',
        'price': 480
      },
      {
        'id': nanoid(),
        'title': 'Order a comfort class Check-in',
        'price': 600
      },
      {
        'id': nanoid(),
        'title': 'Order a business class Check-in',
        'price': 820
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order an economy Sightseeing',
        'price': 480
      },
      {
        'id': nanoid(),
        'title': 'Order a comfort class Sightseeing',
        'price': 600
      },
      {
        'id': nanoid(),
        'title': 'Order a business class Sightseeing',
        'price': 820
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Order an economy Restaurant',
        'price': 480
      },
      {
        'id': nanoid(),
        'title': 'Order a comfort class Restaurant',
        'price': 600
      },
      {
        'id': nanoid(),
        'title': 'Order a business class Restaurant',
        'price': 820
      }
    ]
  },
];

const destinations = [
  {
    id: '1',
    description:'',
    name: '',
    pictures: [
    ]
  },
  {
    id: '2',
    description:getRandomArrayElement(Descriptions),
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Event photo'
      }
    ]
  },
  {
    id: '3',
    description:getRandomArrayElement(Descriptions),
    name: 'Berlin',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=4',
        description: 'Event photo'
      }
    ]
  },
  {
    id: '4',
    description: getRandomArrayElement(Descriptions),
    name: 'Brooklyn',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=6',
        description: 'Event photo'
      }
    ]
  },
  {
    id: '5',
    description: getRandomArrayElement(Descriptions),
    name: 'New York',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=6',
        description: 'Event photo'
      }
    ]
  },
  {
    id: '6',
    description: getRandomArrayElement(Descriptions),
    name: 'Moscow',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=7',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=8',
        description: 'Event photo'
      }
    ]
  }
];


function getPoint(){
  return {
    id: nanoid(),
    ...getRandomArrayElement(point)};
}

function getOffer() {
  return moreOffers;
}

function getDestination() {
  return destinations;
}

export {getPoint, getOffer, getDestination};
