import mongoose from "mongoose";

const subscriberSchema = mongoose.Schema({
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

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
