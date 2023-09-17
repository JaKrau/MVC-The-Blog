const router = require('express').Router();
const bcrypt = require('bcrypt');
const { handleError, authorize } = require('../../utils/helpers');
const { User } = require("../../models");

// POST route for user signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error("UserAlreadyExists")//409
    }
    const newUser = await User.create({
      username,
      password,
    });
    const user_id = newUser.dataValues.id;
    if (newUser) {
      req.session.save(() => {
        req.session.user_id = user_id;
        req.session.signed_in = true;
        req.session.username = username;
        res.redirect(`/dashboard`);
      });
    } else {
      throw new Error("UserCreationFailed")//401
    }
  } catch (err) {
    handleError(err, res, req);
  }
});

// POST route for user signin
router.post("/signin", async (req, res) => { 
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if(!user) {
      throw new Error("UserValidationFailed")//401
    }
    const user_id = user.dataValues.id;  
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      throw new Error("UserValidationFailed")//401
    }
    req.session.save(() => {
      req.session.user_id = user_id;
      req.session.signed_in = true;
      req.session.username = username;
      res.redirect("/dashboard");
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

// POST route for user signout
router.post("/signout", authorize, (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/signin");
    });
  } catch (err) {
    handleError(err, res, req);
  }
});

module.exports = router;