import express from 'express';
import userRoute from './routes/user.route.js';
import connectDB from './config/dbConnection.js';
import contactRoute from './routes/contact.route.js';

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/contacts', contactRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});