const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log('Environment:', process.env.NODE_ENV || 'development');
});
