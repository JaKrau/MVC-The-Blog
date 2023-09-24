// COMMENT ROUTES

const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  return res.status(200).send('Welcome to the comments');
});

router.post('/', withAuth, async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    console.log(comment);

    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    res.status(200).json({ message: 'success', comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server Error' });
  }
});

module.exports = router;
