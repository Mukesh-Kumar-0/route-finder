
import { Station, Train } from '../types/train';

export const stations: Station[] = [
  { id: '1', name: 'Chennai Central', code: 'MAS' },
  { id: '2', name: 'Bangalore City', code: 'SBC' },
  { id: '3', name: 'Mysuru Junction', code: 'MYS' },
  { id: '4', name: 'Mangalore Central', code: 'MAQ' },
  { id: '5', name: 'Vellore Cantonment', code: 'VLR' },
  { id: '6', name: 'Shimoga Town', code: 'SMG' },
  { id: '7', name: 'Hubli Junction', code: 'UBL' },
  { id: '8', name: 'Mumbai Central', code: 'BCT' },
  { id: '9', name: 'Delhi Junction', code: 'DLI' },
  { id: '10', name: 'Hyderabad Deccan', code: 'HYB' },
  { id: '11', name: 'Coimbatore Junction', code: 'CBE' },
  { id: '12', name: 'Kochi Central', code: 'ERS' },
  { id: '13', name: 'Trivandrum Central', code: 'TVC' },
  { id: '14', name: 'Vijayawada Junction', code: 'BZA' },
  { id: '15', name: 'Visakhapatnam', code: 'VSKP' },
  { id: '16', name: 'Pune Junction', code: 'PUNE' },
  { id: '17', name: 'Ahmedabad Junction', code: 'ADI' },
  { id: '18', name: 'Jaipur Junction', code: 'JP' },
  { id: '19', name: 'Lucknow Junction', code: 'LJN' },
  { id: '20', name: 'Kanpur Central', code: 'CNB' }
];

export const trains: Train[] = [
  {
    id: '1',
    name: 'Shatabdi Express',
    number: '12007',
    stops: [
      { stationId: '1', stationName: 'Chennai Central', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '09:00' },
      { stationId: '5', stationName: 'Vellore Cantonment', distanceFromPrevious: 170, cumulativeDistance: 170, departureTime: '11:00', arrivalTime: '10:55' },
      { stationId: '2', stationName: 'Bangalore City', distanceFromPrevious: 200, cumulativeDistance: 370, departureTime: '15:30', arrivalTime: '15:25' },
      { stationId: '3', stationName: 'Mysuru Junction', distanceFromPrevious: 120, cumulativeDistance: 490, departureTime: '17:30', arrivalTime: '17:25' },
      { stationId: '4', stationName: 'Mangalore Central', distanceFromPrevious: 300, cumulativeDistance: 790, departureTime: '21:45', arrivalTime: '21:40' }
    ]
  },
  {
    id: '2',
    name: 'Karnataka Express',
    number: '12628',
    stops: [
      { stationId: '2', stationName: 'Bangalore City', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '09:00' },
      { stationId: '6', stationName: 'Shimoga Town', distanceFromPrevious: 180, cumulativeDistance: 180, departureTime: '12:00', arrivalTime: '11:55' },
      { stationId: '4', stationName: 'Mangalore Central', distanceFromPrevious: 250, cumulativeDistance: 430, departureTime: '17:30', arrivalTime: '17:25' }
    ]
  },
  {
    id: '3',
    name: 'Mangalore Express',
    number: '16630',
    stops: [
      { stationId: '2', stationName: 'Bangalore City', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '16:00' },
      { stationId: '6', stationName: 'Shimoga Town', distanceFromPrevious: 180, cumulativeDistance: 180, departureTime: '19:00', arrivalTime: '18:55' },
      { stationId: '4', stationName: 'Mangalore Central', distanceFromPrevious: 250, cumulativeDistance: 430, departureTime: '23:45', arrivalTime: '23:40' }
    ]
  },
  {
    id: '4',
    name: 'Rajdhani Express',
    number: '12431',
    stops: [
      { stationId: '9', stationName: 'Delhi Junction', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '17:00' },
      { stationId: '18', stationName: 'Jaipur Junction', distanceFromPrevious: 308, cumulativeDistance: 308, departureTime: '20:15', arrivalTime: '20:10' },
      { stationId: '8', stationName: 'Mumbai Central', distanceFromPrevious: 1200, cumulativeDistance: 1508, departureTime: '08:30', arrivalTime: '08:25' }
    ]
  },
  {
    id: '5',
    name: 'Duronto Express',
    number: '12213',
    stops: [
      { stationId: '8', stationName: 'Mumbai Central', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '22:00' },
      { stationId: '16', stationName: 'Pune Junction', distanceFromPrevious: 165, cumulativeDistance: 165, departureTime: '00:30', arrivalTime: '00:25' },
      { stationId: '2', stationName: 'Bangalore City', distanceFromPrevious: 840, cumulativeDistance: 1005, departureTime: '12:15', arrivalTime: '12:10' },
      { stationId: '1', stationName: 'Chennai Central', distanceFromPrevious: 370, cumulativeDistance: 1375, departureTime: '18:00', arrivalTime: '17:55' }
    ]
  },
  {
    id: '6',
    name: 'Coromandel Express',
    number: '12841',
    stops: [
      { stationId: '1', stationName: 'Chennai Central', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '14:20' },
      { stationId: '14', stationName: 'Vijayawada Junction', distanceFromPrevious: 430, cumulativeDistance: 430, departureTime: '21:30', arrivalTime: '21:25' },
      { stationId: '15', stationName: 'Visakhapatnam', distanceFromPrevious: 350, cumulativeDistance: 780, departureTime: '04:15', arrivalTime: '04:10' }
    ]
  },
  {
    id: '7',
    name: 'Konkan Kanya Express',
    number: '10111',
    stops: [
      { stationId: '8', stationName: 'Mumbai Central', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '11:25' },
      { stationId: '4', stationName: 'Mangalore Central', distanceFromPrevious: 765, cumulativeDistance: 765, departureTime: '05:30', arrivalTime: '05:25' },
      { stationId: '12', stationName: 'Kochi Central', distanceFromPrevious: 350, cumulativeDistance: 1115, departureTime: '12:45', arrivalTime: '12:40' },
      { stationId: '13', stationName: 'Trivandrum Central', distanceFromPrevious: 220, cumulativeDistance: 1335, departureTime: '16:00', arrivalTime: '15:55' }
    ]
  },
  {
    id: '8',
    name: 'Howrah Express',
    number: '12505',
    stops: [
      { stationId: '17', stationName: 'Ahmedabad Junction', distanceFromPrevious: 0, cumulativeDistance: 0, departureTime: '19:35' },
      { stationId: '8', stationName: 'Mumbai Central', distanceFromPrevious: 545, cumulativeDistance: 545, departureTime: '07:15', arrivalTime: '07:10' },
      { stationId: '16', stationName: 'Pune Junction', distanceFromPrevious: 165, cumulativeDistance: 710, departureTime: '09:30', arrivalTime: '09:25' }
    ]
  }
];
