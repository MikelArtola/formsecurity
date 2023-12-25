var express = require('express');
var router = express.Router();
const fakeDB = [
  {
    id: Math.floor(Math.random() * 100),
    email: "test@example.com",
  },
 ];
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (!username || username.length < 5) {
    return res.status(400).send('Username must be at least 5 characters long.');
  }

  const passwordRegex = /^[a-zA-Z0-9]+$/;
  if (!password || !password.match(passwordRegex) || password.length < 6) {
    return res.status(400).send('Password must be alphanumeric and at least 6 characters long.');
  }

  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match.');
  }

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email || !email.match(emailRegex)) {
    return res.status(400).send('Emaila ez da egokia.');
  }

  // Echoing back the data (excluding password for security)
  res.json({ username, email });
});


module.exports = router;
