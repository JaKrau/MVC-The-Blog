const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');
const userAuth = require('./userAuth');

router.use('/blog', blogPostRoutes);
router.use('/users', userAuth);

module.exports = router;