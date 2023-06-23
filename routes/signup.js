const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const signupForm = require('./views/signup');

const app = express();

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already taken');
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/signup', (req, res) => {
  res.send(signupForm);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
