import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Train from '../models/Train.js';
import connectDB from '../config/db.js';

dotenv.config();
await connectDB();

const stations = ['Chennai', 'Vellore', 'Bangalore', 'Mysuru', 'Mangalore', 'Shimoga', 'Hubli', 'Hyderabad'];

const randomTime = () => {
  const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${h}:${m}`;
};

const generateTrains = async () => {
  await Train.deleteMany();

  for (let i = 0; i < 1000; i++) {
    const stopCount = 3 + Math.floor(Math.random() * 5);
    const shuffled = stations.sort(() => 0.5 - Math.random()).slice(0, stopCount);

    const stops = [];
    for (let j = 0; j < shuffled.length; j++) {
      stops.push({
        station: shuffled[j],
        distance: j === 0 ? 0 : Math.floor(Math.random() * 200) + 50,
        time: randomTime()
      });
    }

    await Train.create({
      name: `Train ${i + 1}`,
      stops
    });
  }

  console.log('1000 Trains generated');
  process.exit();
};

generateTrains();
