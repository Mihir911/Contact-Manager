import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  message: { type: String, required: false }
});

export default mongoose.model("Contact", contactSchema);