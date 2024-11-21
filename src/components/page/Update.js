import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";

export default function Update() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const countRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const publisherRef = useRef(null);
  const yearRef = useRef(null);

  const validateFields = () => {
    if (!countRef.current || !countRef.current.value.trim()) {
      alert("번호를 입력하세요.");
      countRef.current?.focus();
      return false;
    }
    if (!titleRef.current || !titleRef.current.value.trim()) {
      alert("책 제목을 입력하세요.");
      titleRef.current?.focus();
      return false;
    }
    if (!authorRef.current || !authorRef.current.value.trim()) {
      alert("저자를 입력하세요.");
      authorRef.current?.focus();
      return false;
    }
    if (!publisherRef.current || !publisherRef.current.value.trim()) {
      alert("출판사를 입력하세요.");
      publisherRef.current?.focus();
      return false;
    }
    if (!yearRef.current || !yearRef.current.value.trim()) {
      alert("출판년도를 입력하세요.");
      yearRef.current?.focus();
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://672cc4affd89797156401d7c.mockapi.io/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));

    try {
      if (!validateFields()) return;
      await axios.put(`https://672cc4affd89797156401d7c.mockapi.io/books/${id}`, {
        ...book,
        [name]: value,
      });
      setUpdateCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const moveList = () => {
    navigate("/list");
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`https://672cc4affd89797156401d7c.mockapi.io/books/${id}`);
        alert("삭제가 완료되었습니다.");
        navigate("/list"); 
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };
  return (
    <Container className="mt-4">
      {book ? (
        <div>
          <Card className="p-4 mb-4">
            <h1 className="text-center">Book Detail</h1>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Year:</strong> {book.year}</p>
            <p><strong>Count:</strong> {book.count}</p>
            <p>Total Updates: {updateCount}</p>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="primary" onClick={() => setShowEdit(true)}>수정하기</Button>
              <Button variant="danger" onClick={handleDelete}>삭제하기</Button>
              <Button variant="secondary" onClick={moveList}>돌아가기</Button>
            </div>
          </Card>

          {showEdit && (
            <Card className="p-4">
              <h2 className="text-center">Edit Book</h2>
              <Form>
                <Form.Group controlId="title" className="mt-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    ref={titleRef}
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="author" className="mt-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    ref={authorRef}
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="publisher" className="mt-3">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    ref={publisherRef}
                    type="text"
                    name="publisher"
                    value={book.publisher}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="year" className="mt-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    ref={yearRef}
                    type="number"
                    name="year"
                    value={book.year}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="count" className="mt-3">
                  <Form.Label>Count</Form.Label>
                  <Form.Control
                    ref={countRef}
                    type="number"
                    name="count"
                    value={book.count}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className="mt-4 w-100" onClick={() => setShowEdit(false)}>
                  Close
                </Button>
              </Form>
            </Card>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}
