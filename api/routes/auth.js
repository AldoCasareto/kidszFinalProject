const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Register

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      shortBio: req.body.shortBio,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json('Please check your login details');

    const validatedPass = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatedPass && res.status(400).json('Please check your login details');

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {}
});

module.exports = router;
