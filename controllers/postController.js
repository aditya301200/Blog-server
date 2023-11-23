const Post = require("../models/postModel");
const Comment = require('../models/commentModel');
const Like = require("../models/likeModel");

exports.createPost = async (req, res) => {
  try {
    const { user, title, body, createdAt, updatedAt } = req.body;

    const createPost = await Post.create({
      user,
      title,
      body,
      createdAt,
      updatedAt: Date.now(),
    });

    res.status(200).json({
      success: true,
      data: createPost,
      message: "Post created successfully",
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

exports.getAllPost = async (req, res) => {
  try {
    const getAllPost = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      data: getAllPost,
      message: "Post Getting successfully",
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

exports.getOnePost = async (req, res) => {
  try {
    const {id} = req.params;
    const getPost = await Post.findById({_id: id})
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      data: getPost,
      message: "Single post fetching successful",
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

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const updatePost = await Post.findOneAndUpdate(
      {_id: id},
      { title, body, updatedAt: Date.now() },
      { new: true },
    ).exec();

    res.status(200).json({
      success: true,
      data: updatePost,
      message: "Post updated successfully",
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

exports.deletePost = async (req, res) => {
  try {
    const {id} = req.params;

    const deletePost = await Post.findByIdAndDelete(id).exec();

    const deleteComments = await Comment.deleteMany({post: id}).exec();
    const deleteLikes = await Like.deleteMany({post: id}).exec();

    res.status(200).json({
      success: true,
      data: deletePost,
      comments: deleteComments,
      likes: deleteLikes,
      message: "Post deleted successfully",
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