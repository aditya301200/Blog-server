const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const likePost = await Like.create({ post, user });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: likePost._id } },
      { new: true },
    )
      .populate("likes")
      .exec();

    res.status(200).json({
      success: true,
      data: likePost,
      post: updatedPost,
      message: "Post liked successfully",
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

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    const unlikePost = await Like.findOneAndDelete({ post: post, _id: like });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: unlikePost._id } },
      { new: true },
    ).populate('likes').exec();

    res.status(200).json({
      success: true,
      data: unlikePost,
      post: updatedPost,
      message: "Post liked successfully",
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
