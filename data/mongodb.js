import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/data';

async function startMongo() {
	try {
		await mongoose.connect(DB_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});
	} catch (error) {
		console.log('Server error', error.message);
	}
}

startMongo();

export default mongoose;
