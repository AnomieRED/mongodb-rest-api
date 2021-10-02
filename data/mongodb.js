import mongoose from 'mongoose';

const DB_CONNECT = process.env.DB_CONNECT || 'mongodb://localhost:27017/data';

async function startMongo() {
	try {
		await mongoose.connect(DB_CONNECT, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
	} catch (error) {
		console.log('Server error', error.message);
	}
}

startMongo();

export default mongoose;
