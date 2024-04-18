const express = require("express");
const post_route = express();

const bodyParser = require("body-parser");
post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/postImages"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

const postController = require("../controllers/postController");

// Route for creating a post with image upload
post_route.post(
  "/create-post",
  upload.single("image"),
  postController.createPost
);

// Route for getting all posts
post_route.get("/get-posts", postController.getPosts);

// Route for deleting a post by ID
post_route.get("/delete-post/:id", postController.deletePost);

// Route for updating a post with image upload
post_route.post(
  "/update-post",
  upload.single("image"),
  postController.updatePost
);

module.exports = post_route;
