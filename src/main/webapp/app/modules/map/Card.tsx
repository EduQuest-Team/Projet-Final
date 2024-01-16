import Card from 'react-bootstrap/Card';
import Carousel from 'better-react-carousel';
import React from 'react';

function Cards({ data }) {
  return (
    <Carousel cols={3} rows={3} gap={10} loop>
      {data.map(item => {
        return (
          <Carousel.Item key={item.id}>
            <Card style={{ width: '18rem', margin: '5px' }}>
              <Card.Body>
                <Card.Img src={`data:image/jpeg;base64,${item.image}`}></Card.Img>
                <Card.Title>{item.nom}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.garde}</Card.Subtitle>
                <Card.Text>{item.adresse}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Cards;
