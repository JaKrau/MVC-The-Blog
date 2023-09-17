const router = require('express').Router();
const { handleError, authorize, signedIn } = require('../utils/helpers');
const { User, Posts, Comments } = require("../models");

// The Home page route
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    const posts = postData.map((post) => {
      const plainPost = post.get({ plain: true });
      plainPost.formattedDate = post.formatDate();
      return plainPost;
    });
    res.render("homePage", {
      user_id: req.session.user_id,
      username: req.session.username,
      signed_in: req.session.signed_in,
      posts: posts,
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

// GET route for the sign up page
router.get("/signup", signedIn, (req, res) => {
  try {
    res.render("signup", {
      user_id: req.session.user_id,
      username: req.session.username,
      signed_in: req.session.signed_in,
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

// GET route for the sign in page
router.get("/signin", signedIn, (req, res) => {
  try {
    res.render("signin", {
      user_id: req.session.user_id,
      username: req.session.username,
      signed_in: req.session.signed_in,
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

// GET route for the dashboard page
router.get("/dashboard", authorize, async (req, res) => {
  try {
    const postData = await Posts.findAll({
      where: { author_id: req.session.user_id },
      order: [["created_at", "DESC"]],
    });
    const posts = postData.map((post) => {
      const plainPost = post.get({ plain: true });
      plainPost.formattedDate = post.formatDate();
      return plainPost;
    });
    res.render("dashboard", {
      user_id: req.session.user_id,
      username: req.session.username,
      signed_in: req.session.signed_in,
      posts: posts,
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

// GET route for the individual blog post page
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comments,
          attributes: ["id", "content", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
       order: [[{ model: Comments }, "created_at", "DESC"]],
    });
    if (!postData) {
      throw new Error("NotFound");//404
    }
    let post = postData.get({ plain: true });
    post.formattedDate = postData.formatDate();
    for (let comment of post.comments) {
      const commentInstance = await Comments.findByPk(comment.id);
      comment.formattedDate = commentInstance.formatDate();
    }
    res.render("post", {
      user_id: req.session.user_id,
      username: req.session.username,
      signed_in: req.session.signed_in,
      post: post,
      comments: post.comments,
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

// GET route for routes that don't exist, if user attempts to access them via url
router.get("/*", async (req, res) => {
  try {
    res.render("homepage", {
      user_id: req.session.user_id,
      username: req.session.username,
      signed_in: req.session.signed_in,
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

module.exports = router;