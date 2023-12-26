import express from 'express';
import { User } from '../models/userModel.js';
import mongoose from 'mongoose';

const usersRoute = express.Router();
//POST request for sign up page. Create new user
usersRoute.post('/signUp', async (request, response) => {
  try {
    if (
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.userName ||
      !request.body.email
    ) {
      return response.status(400).send({ message: 'Missing Required Fields' });
    }
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      userName: request.body.userName,
      email: request.body.email,
    };

    const user = await User.create(newUser);
    return response.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//get all users
usersRoute.get('/', async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get one user
usersRoute.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update user
usersRoute.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'User Not Found ' });
    }
    return response
      .status(200)
      .send({ message: 'User Successfully Updated', data: request.body });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//delete user
usersRoute.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'User Not Found ' });
    }
    return response.status(200).send({
      message: `user ${id} Successfully Deleted`,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default usersRoute;
