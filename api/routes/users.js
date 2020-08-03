const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const isAuth = require('../middleware/isAuth');
const User = require('../models/User');

router.post('/registration', async (req, res) => {
  const { name, email, password, terms } = req.body;

  if (!name || !email || !password) return res.status(400).json({ msg: 'Please enter all fields' });
  if (!terms) return res.status(400).json({ msg: 'Please select our terms and conditions' });
  if (!email.includes('@') || !email.includes('.')) return res.status(400).json({ msg: 'Invalid email format' });

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({ name, email, password, terms });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          await newUser.save();
          res.status(200).json({ success: true, msg: "User successfully registered" })
        } catch (err) {
          res.status(400).json({ success: false })
        }
      })
    })
  } catch (err) {
    res.status(400).json({ success: false, err })
  }
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ msg: 'User does not exist', success: false });

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) res.status(400).json({ msg: 'Invalid credentials', success: false });

    jwt.sign({ id: user._id }, process.env.JWT_KEY_SECRET, (err, token) => {
      if (err) throw err;
      res.setHeader('Set-Cookie', cookie.serialize('access_token', token, { httpOnly: true, maxAge: 3600, sameSite: true, path: '/api' }));
      res.status(200).json({ success: true, msg: 'User successfully logged', user: { _id: user._id, name: user.name, email: user.email, registerDate: user.registerDate } })
    });
  } catch (err) {
    res.status(400).json({ succes: false, err });
  }
});

router.get('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('_id name email registerDate')
    res.status(200).json({ succes: true, user });
  } catch (err) {
    res.status(400).json({ succes: false, err });
  }
});

router.get('/logout', isAuth, async (req, res) => {
  try {
    res.setHeader('Set-Cookie', cookie.serialize('access_token', '', { maxAge: 0, path: '/api', httpOnly: true, sameSite: true }))
    res.status(200).json({ success: true, msg: 'User successfully logout' })
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
})

module.exports = router;