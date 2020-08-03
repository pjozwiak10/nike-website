const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.access_token;

  if (!token) res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ success: false, msg: 'Token is not valid' });
  }
}

module.exports = isAuth;