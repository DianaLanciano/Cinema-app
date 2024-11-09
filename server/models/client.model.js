import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  Phone: {
    type: String,
  },
  channel: {
    type: [String]
  }
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
