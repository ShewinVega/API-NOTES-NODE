
const User = require('../models/user.model');

module.exports = {

  async signup(body) {
    try {
      
      const { email, password } = body;

      // Email validation
      const userEmail = await User.findOne({email});
      if(userEmail) return {
        error: true,
        message: `Email already exist!`,
      }

      const newUser = new User({
        name: body.name,
        email,
        password,
      });

      // Encrypt password
      newUser.password = await newUser.encryptPassword(password);

      // Save user in the database
      const data = await newUser.save();

      if(!data) return {
        error: true,
        message: `User created successfully`,
      }
      return {
        error: false,
        message: `User created successfully`,
        data
      }

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }

  }

}