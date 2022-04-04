const mongoose = require("mongoose");
const config = require("./config");

class Kitten {
  constructor() {
    this.kittySchema = new mongoose.Schema({
      name: String,
    });
    this.model = undefined;
    this.connect()
      .then((this.model = new mongoose.model("kitty", this.kittySchema)))
      .catch(console.log);
  }

  connect = async () => {
    await mongoose.connect(config.connectionString);
  };

  save = async (name) => {
    const kittyDoc = new this.model({ name:name });
    await kittyDoc.save();
  };

  getAll = async () => {
    return await this.model.find({})
  };
}

module.exports=Kitten
