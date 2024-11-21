import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

export default function Create() {
  const [data, setData] = useState({ count: "", title: "", author: "", publisher: "", year: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://672cc4affd89797156401d7c.mockapi.io/books", data);
      alert("Data saved successfully!");
      navigate("/list");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h1 className="text-center">Create a New Book</h1>
        <Form>
          <Form.Group controlId="count">
            <Form.Label>Count</Form.Label>
            <Form.Control type="number" name="count" value={data.count} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="title" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={data.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="author" className="mt-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={data.author} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="publisher" className="mt-3">
            <Form.Label>Publisher</Form.Label>
            <Form.Control type="text" name="publisher" value={data.publisher} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="year" className="mt-3">
            <Form.Label>Year</Form.Label>
            <Form.Control type="number" name="year" value={data.year} onChange={handleChange} />
          </Form.Group>
          <Button className="mt-4 w-100" onClick={handleSubmit}>
            Save Data
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
