const loginForm = require('./views/login');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Store user information in the session
    req.session.user = user;

    res.redirect('/main');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/login', (req, res) => {
  res.send(loginForm);
});
