const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://vantoan24:Vantoan24%40@cluster0.eiife.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB connected : ${conn.connection.message}`);
  } catch (error) {
    console.error(`Error connecting to mongoDB: ${error.message}`);
  }
};

module.exports = connectMongoDB;