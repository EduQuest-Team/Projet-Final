import Card from 'react-bootstrap/Card';
import Carousel from 'better-react-carousel';
import React from 'react';

function Cards({ data }) {
  return (
    <Carousel cols={3} rows={3} gap={10} loop>
      {data.map(item => {
        return (
          <Carousel.Item key={item._id}>
            <Card style={{ width: '18rem', margin: '5px' }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.garde}</Card.Subtitle>
                <Card.Text>{item.address}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Cards;
