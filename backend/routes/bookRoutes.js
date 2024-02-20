import express from 'express';
import { Book } from '../models/bookModel.js';
import mongoose from 'mongoose';

const booksRoute = express.Router();
//POST request for sign up page. Create new book
booksRoute.post('/add-book', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.genre ||
      !request.body.description
    ) {
      return response.status(400).send({ message: 'Missing Required Fields' });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      image: request.body.image,
      genre: request.body.genre,
      description: request.body.description,
      favorite: false,
    };

    const book = await Book.create(newBook);
    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//get all books
booksRoute.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get one book
booksRoute.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update book
booksRoute.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Book Not Found ' });
    }
    return response
      .status(200)
      .send({ message: 'Book Successfully Updated', data: request.body });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//delete book
booksRoute.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Book Not Found ' });
    }
    return response.status(200).send({
      message: `book ${id} Successfully Deleted`,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default booksRoute;
