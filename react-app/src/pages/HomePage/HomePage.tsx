import React, { FC } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import ComparisonList from '../../features/comparison/components/ComparisonList/ComparisonList';
import './HomePage.scss';

interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => {
  let params = useParams();
  let userId = params.userId;

  return <div className="HomePage" data-testid="HomePage">
    <Container>
      <Row className="py-5">
        <Col>
          <h2>Willkommen bei Kompaerjon!</h2>
          Dein persönlicher Helfer, der Dich beim Vergleichen unterstützt.
        </Col>
      </Row>
      <Row xs={1} sm={1} md={3} className='g-4 highlights'>
        <Col>
          <Card border='primary' className="h-100">
            <Card.Body>
              <Card.Title>
                Behalte den Überblick
              </Card.Title>
              <Card.Text>
                Für dein neues Auto führst du Merklisten auf verschiedenen Plattformen? Füge deine Links, die du vergleichen möchtest, einfach hier zusammen.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border='primary' className="h-100">
            <Card.Body>
              <Card.Title>
                Vereinheitliche Merkmale
              </Card.Title>
              <Card.Text>
                Suche nach Merkmalen mit verschiedenen Schlüsselwörtern. So findest du dein Auto mit Anhängerkupplung (oder doch AHK?). 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border='primary' className="h-100">
            <Card.Body>
              <Card.Title>
                Setze Prioritäten
              </Card.Title>
              <Card.Text>
                Ein Merkmal ist dir besonders wichtig oder anders herum einige sind der eher nicht so wichtig? Führe deine eigenes Punkte-System ein.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border='primary' className="h-100">
            <Card.Body>
              <Card.Title>
                Ergänze, was fehlt
              </Card.Title>
              <Card.Text>
                Ein Merkmal fehlt, kann aber nachgerüstet werden? Trage die anfallenden Kosten einfach nach.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border='primary' className="h-100">
            <Card.Body>
              <Card.Title>
                Teile deinen Vergleich
              </Card.Title>
              <Card.Text>
                Du kennst jemanden, der mal rüberschauen soll? Teile deinen Vergleich und nutzt gemeinsame Notizen.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border='primary'>
            <Card.Body>
              <Card.Title>
                Lorem ipsum
              </Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {userId && <Row className="py-5">
        <h4>Deine Vergleiche</h4>
        <ComparisonList />
      </Row>} 
    </Container>
  </div>
};

export default HomePage;
