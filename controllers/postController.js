const Post = require("../models/postModel");

//createPost
const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      date: req.body.date,
      image: "public/postImages/" + req.file.filename,
    });
    const postData = await post.save();

    return res
      .status(200)
      .send({ success: true, msg: "Post Data", data: postData });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

//getPosts

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res
      .status(200)
      .send({ success: true, msg: "Posts Data", data: posts });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

//deletePOst

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    await Post.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ success: true, msg: "Post deleted Successfully!" });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

//UpdatePost

const updatePost = async (req, res) => {
  try {
    const { id, title, date } = req.body;

    var updateObj = {
      title,
      date,
    };
    if (req.file !== undefined) {
      updateObj.image = "public/postImages/" + req.file.filename;
    }

    const updatedData = await Post.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateObj,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      msg: "Post Updated Sucessfully!",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
