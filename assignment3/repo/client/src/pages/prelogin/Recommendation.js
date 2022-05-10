import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import Avatar from 'react-avatar';
import Avatar from "../../avater/index.js"
import React from "react";

export default function Recommendation({ recommendations }) {
  return (
    <>
      <Row xs={1} md={2} className="g-2 p-2 m-2">
        {recommendations.map((recommendation) => (
          <Col key={recommendation.id}>
            <Card style={{minHeight:"150px"}}>
              <Card.Body className="bg-light">
                <Card.Title>
                  <Avatar color={Avatar.getRandomColor(recommendation.name, ['#A62A21', '#7e3794', '#0B51C1', '#3A6024', '#A81563', '#B3003C'])} 
                    name={recommendation.name}
                    size="30px"
                    round="20px"
                  />
                  {" "} #{recommendation.symbol}
                </Card.Title>
                <Card.Text>{recommendation.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
