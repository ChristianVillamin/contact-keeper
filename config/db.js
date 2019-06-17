const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  // Promises Version
  // mongoose
  //   .connect(db, {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false
  //   })
  //   .then(() => console.log('MongoDB Connected'))
  //   .catch(error => {
  //     console.error(error.message);
  //     process.exit(1);
  //   });
};

module.exports = connectDB;
