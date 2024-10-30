import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "./constants";

const BookModal = ({
  books,
  selectedBook,
  setSelectedBook,
  setBooks,
  setShowModal,
}) => {
  const [newBook, setNewBook] = useState({ name: "", author: "", pages: "" });

  // Add a new book
  const handleAddBook = async () => {
    try {
      const response = await axios.post(API_URL, newBook);
      setBooks([...books, response.data]);
      setShowModal(false);
      setNewBook({ name: "", author: "", pages: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update an existing book
  const handleUpdateBook = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/${selectedBook.id}`,
        selectedBook
      );
      setBooks(
        books.map((book) =>
          book.id === selectedBook.id ? response.data : book
        )
      );
      setShowModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        setShowModal(false);
        setSelectedBook(null);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedBook ? "Edit Book" : "Add New Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book name"
              value={selectedBook ? selectedBook.name : newBook.name}
              onChange={(e) =>
                selectedBook
                  ? setSelectedBook({ ...selectedBook, name: e.target.value })
                  : setNewBook({ ...newBook, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author"
              value={selectedBook ? selectedBook.author : newBook.author}
              onChange={(e) =>
                selectedBook
                  ? setSelectedBook({
                      ...selectedBook,
                      author: e.target.value,
                    })
                  : setNewBook({ ...newBook, author: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pages</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of pages"
              value={selectedBook ? selectedBook.pages : newBook.pages}
              onChange={(e) =>
                selectedBook
                  ? setSelectedBook({
                      ...selectedBook,
                      pages: e.target.value,
                    })
                  : setNewBook({ ...newBook, pages: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(false);
            setSelectedBook(null);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={selectedBook ? handleUpdateBook : handleAddBook}
        >
          {selectedBook ? "Update Book" : "Add Book"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookModal;
