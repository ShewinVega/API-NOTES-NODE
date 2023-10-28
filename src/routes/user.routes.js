const router = require('express').Router();
const {
  renderSignUpForm,
  signUp,
  renderSignInForm,
  signIn,
  logout
} = require('../controllers/user.controllers');
const passport=require('passport');

router.get('/signup', renderSignUpForm);
router.post('/signup', signUp);

router.get('/signin', renderSignInForm);
router.post('/signin', passport.authenticate('local-login', {
  failureRedirect: '/api/users/signin',
  successRedirect: '/api/notes',
  failureFlash: true,
}));


router.get('/logout', logout);

module.exports = router;