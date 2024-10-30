import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "./constants";
import BookModal from "./BookModal";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Get books filtered by search
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { name: search, author: search },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, [search]);

  // Delete a book by id
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <Container className="mt-4">
      {showModal && (
        <BookModal
          books={books}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          setBooks={setBooks}
          setShowModal={setShowModal}
        />
      )}

      <h1>Library Book Manager</h1>
      <Form.Control
        type="text"
        placeholder="Search by name or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Book
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.pages}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setSelectedBook(book);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Books;
