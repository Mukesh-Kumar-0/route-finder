import mongoose from 'mongoose';

const StopSchema = new mongoose.Schema({
  station: String,
  distance: Number,
  time: String,
});

const TrainSchema = new mongoose.Schema({
  name: String,
  stops: [StopSchema],
});

const Train = mongoose.model('Train', TrainSchema);
export default Train;
