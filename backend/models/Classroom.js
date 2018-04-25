let mongoose = require("mongoose");

let ClassroomSchema = new mongoose.Schema({
  name: String,
  classroomCode: String
});

ClassroomSchema.methods.findByName = function(callback) {
  return this.model("Classroom").find({ name: this.name }, callback);
};

mongoose.model("Classroom", ClassroomSchema);
