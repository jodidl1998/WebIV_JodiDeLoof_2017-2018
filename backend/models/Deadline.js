let mongoose = require("mongoose");

let DeadlineSchema = new mongoose.Schema({
  date: String,
  vak: String,
  beschrijving: String,
  procent: String,
  classroom: {type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'}
});


mongoose.model("Deadline", DeadlineSchema);
