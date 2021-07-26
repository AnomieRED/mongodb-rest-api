import express from 'express';
import router from './routes/router.js';
import fileUpload from 'express-fileupload';
import mongoose from './data/mongodb.js';

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/', router);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}...`);
});
