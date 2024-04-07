import mongoose from "mongoose";

import date from "@hapi/joi";

// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  availableAt: Date,
  testDuration: {
    type: Number,
    required: true,
  },
  questions: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      options: [
        {
          id: {
            type: Number,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
      answer: {
        type: Number,
        required: true,
      },
    },
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: []
    },
  ],
  passingScore: {
    type: Number,
    required: true
  },
  highestMarks: {
    type: Number,
    required: true
  }
});

const Tests = mongoose.model("Tests", testSchema);

export default Tests;