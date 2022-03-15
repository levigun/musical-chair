const router = require('express').Router();
const { Family, Instrument, User } = require('../models');
const withAuth = require('../utils/auth');

// when page loads renders login page
router.get('/', (req, res) => {
  res.render('login', {
    loggedIn: req.session.loggedIn
  });
});

// if logged in, renders family page /family
router.get('/family', withAuth, async (req, res) => {
  try {
    const familyData = await Family.findAll()
    
    const families = familyData.map((family) =>
    family.get({ plain: true })
    );

    res.render('family', {
      families,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// /family/:id renders the instruments page
router.get('/family/:id', withAuth, async (req, res) => {
  try {
    const instrumentsData = await Family.findByPk(req.params.id, {
      include: [
        {
          model: Instrument,
          attributes: [
            'id',
            'instrument_name',
            'image',
            'price',
            'user_id',
          ],
          include: [
            {
              model: User,
              attributes: [
                'username'
              ]
            }
          ]
        },
      ],
    });
    
    const instruments = instrumentsData.get({ plain: true });
    console.log(instruments);
    // Send over the 'loggedIn' session variable to the 'gallery' template
    res.render('instruments', {
      ...instruments,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// instruments/:id renders details page
router.get('/instrument/:id', withAuth, async (req, res) => {
  try {
    const instrumentData = await Instrument.findByPk(req.params.id, {
      include: [
      {
        model: User,
        attributes: [
          'username'
        ]
      }
    ]
  });

    const instrument = instrumentData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('details', {
      ...instrument,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// /sell renders the selling form
router.get('/sell', async (req, res) => {
  res.render('sell', {
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;