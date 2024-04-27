import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const callbackServer = () => {
	console.log(`Server is running on port ${PORT}`);
};
app.use(express.json());

app.listen(PORT, callbackServer);
