const router = require('express').Router();

router.use('', require('./base.routes.js'));
router.use('/notes', require('./notes.routes.js'));
router.use('/users', require('./user.routes.js'));



module.exports = router;