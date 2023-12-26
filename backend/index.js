import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, MongoDBURI } from './config.js';
import usersRoute from './routes/userRoutes.js';

const app = express();
//MiddleWare for parsing the request body
app.use(express.json());
//MiddleWare for handling CORS Policy
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

//GET home page once connected to the server.
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Book Keeping Live Connected');
});

app.use('/users', usersRoute);

//connect to server only if MongoDB connection has been established
mongoose
  .connect(MongoDBURI)
  .then(() => {
    console.log('app connected to Database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
