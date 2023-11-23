const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    const { user, comment, post, createdAt, updatedAt } = req.body;

    const createComment = await Comment.create({
      user,
      comment,
      post,
      createdAt,
      updatedAt: Date.now(),
    });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: createComment._id },
      },
      { new: true },
    )
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      post: updatedPost,
      data: createComment,
      message: "Comment created successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(400).json({
      success: false,
      data: "Server Error",
      message: err.message,
    });
  }
};

exports.getAllComment = async (req, res) => {
  try {
    const getComments = await Comment.find();

    res.status(200).json({
      success: true,
      data: getComments,
      message: "Comment get successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(400).json({
      success: false,
      data: "Server Error",
      message: err.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const updateComment = await Comment.findByIdAndUpdate(
      { _id: id },
      {
        comment,
        updatedAt: Date.now(),
      },
      {new: true}
    ).exec();


    res.status(200).json({
      success: true,
      data: updateComment,
      message: "Comment updated successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(400).json({
      success: false,
      data: "Server Error",
      message: err.message,
    });
  }
};

exports.deleteComment = async (req,res) => {
  try {
    const {id} = req.params;
    const {post} = req.body;

    const deleteComment = await Comment.findByIdAndDelete({_id: id}).exec();

    const updatePost = await Post.findByIdAndUpdate(
      {_id: post},
      {
        $pull: {comments: deleteComment._id}
      },
      {new: true}
    ).populate("comments").exec();

    res.status(200).json({
      success: true,
      post: updatePost,
      data: deleteComment,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(400).json({
      success: false,
      data: "Server Error",
      message: err.message,
    });
  }
}