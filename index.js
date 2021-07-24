import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js';
import fileUpload from 'express-fileupload';

const PORT = process.env.PORT ?? 8080;
const DB_URL = 'mongodb://localhost:27017';
const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/', router);

async function startMongo() {
   try {
      mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
      app.listen(PORT, () => {
         console.log(`Server started on port ${PORT}...`);
      });
   } catch (error) {
      console.log(error);
   }
}

startMongo();