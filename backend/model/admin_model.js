import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      //  minLength: 6
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("User", AdminSchema);

export default Admin;
