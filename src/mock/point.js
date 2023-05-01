import { getRandomArrayElement } from '../utils';
import { WaypointType } from '../consts';
const point = [ {
  'base_price': 1100,
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
  'is_favorite': false,
  'offers': [
    'b4c3e4e6-9053-42ce-b747-e281314baa31'
  ],
  'type': getRandomArrayElement(WaypointType)
},
{
  'base_price': 1500,
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
  'is_favorite': false,
  'offers': [
    'b4c3e4e6-9053-42ce-b747-e281314baa31'
  ],
  'type': getRandomArrayElement(WaypointType)
},
];


function getPoint(){
  return getRandomArrayElement(point);
}

export {getPoint};
