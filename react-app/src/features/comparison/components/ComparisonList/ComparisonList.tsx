import React, { useEffect, useState, FC } from 'react';
import { Button, Card, Col, Row, Spinner, Stack } from 'react-bootstrap';
import ComparisonDataService from '../../services/ComparisonDataService';
import { IComparison } from '../../types';
import { useNavigate, useParams } from "react-router-dom";
import './ComparisonList.scss';

interface ComparisonListProps {}

const ComparisonList: FC<ComparisonListProps> = () => {
  let navigate = useNavigate();
  let params = useParams();
  let userId: string = params.userId ?? '';
  
  const [comparisons, setComparisons] = useState<IComparison[]>();

  useEffect(() => {
    retrieveComparisons();
  }, []);

  const retrieveComparisons = () => {
    ComparisonDataService.getAll(userId)
      .then((response: any) => {
        setComparisons(response.data);
      })
      .catch((e: Error) => {
        console.log(99, e);
      });
  };

  const openComparison = (userId: string, comparisonId: string) => {
    navigate('/users/' + userId + '/comparisons/' + comparisonId);
  };

  if (!comparisons) {
    return <div className="ComparisonPage" data-testid="ComparisonPage">
      <Stack direction='horizontal'>
        <Spinner animation='border' size='sm'></Spinner>
        <span className='mx-2'>Bitte warten</span>
      </Stack>
    </div>
  } else  if (comparisons.length == 0) {
    return <div className="ComparisonPage" data-testid="ComparisonPage">
      Noch keine Vergleiche
      <Button>Loslegen</Button>
    </div>
  } else {
    return <div className="ComparisonPage" data-testid="ComparisonPage">
      <Row>        
        {comparisons.reverse().map((comparison, key) => (
          <Col md={6} key={key}>
            <Card bg='light' text='dark'>
              <Card.Body>
                <Card.Title>{comparison.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary" onClick={() => openComparison(comparison.userId, comparison.id)}>Öffnen</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  }
};

export default ComparisonList;
