const router = require('express').Router();

const apiRoutes = require('./user-routes');

router.use('/api', apiRoutes);

module.exports = router;
