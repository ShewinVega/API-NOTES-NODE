const {
  signupValidation
} = require('../validations/user.validation');
const {
  signup
} = require('../services/user.services');


module.exports = {

  renderSignUpForm(req,res) {
    res.render('users/signup');
  },

  async signUp(req,res) {
    try {
      const messages = [];

      const { error } = signupValidation(req.body);
      if(error) {
        messages.push({error: error.details[0].message});
        res.render('users/signup',{
          messages,
          name: req.body.name,
          email: req.body.email,
        });
      };

      const { error: dataError, message, data } = await signup(req.body);

      if(dataError) {
        req.flash('error_msg', message);
      }

      req.flash('success_msg',message);
      res.redirect('/api/users/signin');
      


    } catch (error) {
      console.log(`There was an error: ${error}`);
      return req.flash('error_msg',`There was an expected error. Check the logs`);
    }
  },

  renderSignInForm(req,res) {
    res.render('users/signin');
  },

  signIn(req,res) {
    try {

      res.send('SignIn');

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return req.flash('error_msg',`There was an expected error. Check the logs`);
    }
  },

  logout(req,res) {
    try {

      req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'You are logout');
        res.redirect('/api/users/signin');
      });
      // res.redirect('/api/users/signin');

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return req.flash('error_msg',`There was an expected error. Check the logs`);
    }
  }

}