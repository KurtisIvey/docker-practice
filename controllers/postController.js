const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .json({ status: "success", results: posts.length, data: { posts } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail" });
  }
};

// localhost:3000/posts/:id
exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res
      .status(200)
      .json({ status: "success", results: posts.length, data: { post } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail" });
  }
};
