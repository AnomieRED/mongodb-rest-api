import mongoose from 'mongoose';

const Template = new mongoose.Schema({
	name: {
		type: String,
		minlength: 4,
		maxlength: 15,
		required: true,
	},
	price: { type: Number },
	balance: { type: Number },
	picture: { type: String },
});

export default mongoose.model('Products', Template);
