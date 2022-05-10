/* eslint-disable react/prop-types */
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Row, Col,
  Container,
  Form,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "react-bootstrap";

function AddTasks({ addTask }) {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !date) {
      alert("Enter a task");
      return false;
    }

    addTask({ text, date }); //, id: Math.random() });
    setText("");
    setDate("");
    navigate("/tasks");
    return false;
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row xs={1} md={2} className="g-2 p-2 m-2">
          <Col>
            <Form.Group controlId="forTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="forDateTime">
              <Form.Label>Date Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter date and time"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <input type="submit" value="Save Task" />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddTasks;
