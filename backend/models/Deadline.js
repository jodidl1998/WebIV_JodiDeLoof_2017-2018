let mongoose = require('mongoose');

let DeadlineSchema = new mongoose.Schema({
    date: String,
    vak: String,
    beschrijving: String,
    procent: String
  });

  DeadlineSchema.methods.findByDate = function(callback) {
    return this.model('Deadline').find({ date: this.date }, callback);
  };

  mongoose.model('Deadline', DeadlineSchema);