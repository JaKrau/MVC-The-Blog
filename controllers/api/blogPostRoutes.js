const router = require('express').Router();
const { handleError, authorize } = require('../../utils/helpers');
const { Posts, Comments } = require("../../models");
const dayjs = require("dayjs");

// POST route for creating a new blog post
router.post("/newpost", authorize, async (req, res) => {
  try {
    const newPost = await Posts.create({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user_id,
    });
    if (newPost) {
      res.redirect(`/post/${newPost.id}`);
    } else {
      throw new Error("PostCreationFailed")//401
    }
  } catch (err) {
    handleError(err, res, req);
  }
});

// PUT route for updating a blog post
router.put("/editpost/:id", authorize, async (req, res) => {
  try {
    const updatedPost = await Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updatedPost) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      throw new Error("PostUpdateFailed")//401
    }
  } catch (err) {
    handleError(err, res, req);
  }
});

// DELETE route for deleting a blog post
router.delete("/deletepost/:id", authorize, async (req, res) => {
  try {
    const deletedPost = await Posts.destroy({
      where: { id: req.params.id },
    });
    if (deletedPost) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      throw new Error("PostDeletionFailed")//401
    }
  } catch (err) {
    handleError(err, res, req);
  }
});

// POST route for creating a new comment
router.post("/comment", authorize, async (req, res) => {
  try {
    const newComment = await Comments.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    if (newComment) {
      res.redirect(`/post/${req.body.post_id}`);
    } else {
      throw new Error("CommentCreationFailed")//401
    }
  } catch (err) {
    handleError(err, res, req);
  }
});

module.exports = router;