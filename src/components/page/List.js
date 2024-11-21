import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [tempList, setTempList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getText = async () => {
      try {
        const response = await axios.get("https://672cc4affd89797156401d7c.mockapi.io/books");
        setTempList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getText();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Book List</h1>
      {tempList.length > 0 ? (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {tempList.map((book, index) => (
              <tr key={book.id} onClick={() => handleRowClick(book.id)} style={{ cursor: "pointer" }}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.year}</td>
                <td>{book.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </Container>
  );
}
