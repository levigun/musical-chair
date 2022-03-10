const router = require('express').Router();

const apiRoutes = require('.');
const homeRoutes = require('./home-routes');


router.use('/api', apiRoutes);
router.use('/api/home-routes', homeRoutes);


module.exports = router;
