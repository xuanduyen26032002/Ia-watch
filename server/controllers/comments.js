import { CommentModel } from "../models/CommentModel.js";

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    console.log("comments", comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = req.body;

    const comment = new CommentModel(newComment);
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateComment = async (req, res) => {
  try {
    const updateComment = req.body;

    const comment = await CommentModel.findOneAndUpdate(
      { _id: updateComment._id },
      updateComment,
      { new: true }
    );

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
