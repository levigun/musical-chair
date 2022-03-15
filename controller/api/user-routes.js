
const router = require('express').Router();
const { User } = require('../../models');
const { Instrument } = require('../../models');

// CREATE new user

router.post('/users', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Once the user is created they are automatically logged in 
    // so set a 'loggedIn' property in the session with the value true
    req.session.loggedIn = true;
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set a 'loggedIn' property in the session with the value true
    req.session.loggedIn = true;
    res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// sell
router.post('/sell', async (req, res) => {
    try {
      const sellData = await Instrument.create({
        instrument_name: req.body.instrument_name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
      });
  
      // Once the user is created they are automatically logged in 
      // so set a 'loggedIn' property in the session with the value true
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
