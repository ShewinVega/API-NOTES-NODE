const mongoose = require('mongoose');
const dotEnv = require('dotenv');

// environment variables configurations
dotEnv.config();

const url = process.env.MONGODB_URI;

const dbConnection = async () => {
  try {
    
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const database = mongoose.connection;
    database.on('open', () => {
      console.log(`Database connected`);
    });


  } catch (error) {
    console.log(`Failed to connect to mongoDB:  ${error}`); 
  }
};

module.exports = dbConnection;