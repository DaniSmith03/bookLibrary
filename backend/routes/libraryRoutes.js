import express from 'express';
import fetch from 'node-fetch';

const libraryRoute = express.Router();

//Search Books From API
libraryRoute.get('/search-book/:query', async (request, response) => {
  try {
    const { query } = request.params;
    const apiResponse = await fetch(
      `https://openlibrary.org/search.json?q=${query}&lang=en&language=eng&limit=50`
    );
    const searchData = await apiResponse.json();

    //map through users search results and return all works ID Links for the search results. Store in an array.
    const isbnArr = await searchData.docs;
    const bookIdArr = await isbnArr.map((item) => {
      return item.key;
    });
    console.log(bookIdArr);

    //map through collected books in bookIdArr, fetch infortamtion from each endpoint and return desired book information
    const promises = await bookIdArr.map(async (item, index) => {
      const bookResponse = await fetch(`https://openlibrary.org${item}.json`);
      const bookData = await bookResponse.json();
      //Get Book Data from original isbnArr using index
      const title = (await isbnArr[index].title)
        ? isbnArr[index].title
        : 'title not found';
      const isbn = (await isbnArr[index].isbn)
        ? isbnArr[index].isbn[0]
        : 'isbn not found';
      const publisher = (await isbnArr[index].publisher)
        ? isbnArr[index].publisher[0]
        : 'Publisher not found';
      const author = (await isbnArr[index].author_name)
        ? isbnArr[index].author_name[0]
        : 'author not found';
      const genre = (await isbnArr[index].subject)
        ? isbnArr[index].subject
        : 'genre not found';
      const cover = (await isbnArr[index].cover_i)
        ? `https://covers.openlibrary.org/b/id/${isbnArr[index].cover_i}.jpg`
        : 'no image';

      //Store Retrieved information in an object
      const bookObj = {
        title: title,
        author: author,
        cover: cover,
        isbn: isbn,
        publisher: publisher,
        genre: genre,
        description: bookData.description
          ? bookData.description.value
          : 'no description available',
      };
      return bookObj;
    });

    //Wait until all promises have been resolved on each item in the promises array and store the results of each into booksArr
    const booksArr = await Promise.all(promises);

    response.status(200).json(booksArr);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default libraryRoute;
