// BLOG ROUTES

const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    const blogs = blogData.map((blog) => {
      return blog.get({ plain: true });
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server Error' });
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const new_blog = await Blog.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    res.status(200).json({ message: 'success', new_blog });
  } catch (error) {
    console.error();
    res.status(500).json({ message: 'server Error' });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameter
    const { user_id } = req.session; // Get the user ID from the session

    console.log(id, user_id);
    // Find the blog post to update
    const blog = await Blog.findOne({
      where: {
        id: id,
        author_id: user_id,
      },
    });

    console.log(blog);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Update the blog post
    await blog.update(req.body);

    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error();
    res.status(500).json({ message: 'server Error' });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const request = await Blog.destroy({
      where: {
        id: req.params.id,
        author_id: req.session.user_id,
      },
    });

    if (!request) {
      return res.status(400).json({ message: 'No blog Found.' });
    }

    res.status(200).json({ message: 'successfully destroyed', request });
  } catch (error) {
    console.error();
    res.status(500).json({ message: 'server Error' });
  }
});

router.get('/:id/comments', withAuth, async (req, res) => {
  try {
    const request = await Comment.findAll({
      where: {
        blog_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!request) {
      return res.status(400).json({ message: 'No comments found.' });
    }

    const comments = request.map((comment) => {
      return comment.get({ plain: true });
    });

    console.log(comments);

    res.status(200).json({ message: 'success', comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server Error' });
  }
});

module.exports = router;
