import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Content", ContentSchema);
