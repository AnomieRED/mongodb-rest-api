import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';

async function startMongo() {
   try {
      await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
   } catch (error) {
      console.log(error);
   }
}

startMongo();

export default mongoose;