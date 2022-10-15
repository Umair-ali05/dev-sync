/** @format */

import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';

import userRoute from './routes/user.js';
import connect from './db/db.config.js';

config();
connect();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('routes are working fine');
});
app.use('/api', userRoute);

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
