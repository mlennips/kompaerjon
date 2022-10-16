import React, { useEffect, useState, FC } from 'react';
import { Button, Card, Col, Row, Spinner, Stack } from 'react-bootstrap';
import ComparisonDataService from '../../services/ComparisonDataService';
import { IComparison } from '../../types';
import { useNavigate } from "react-router-dom";
import './ComparisonPreview.scss';

interface ComparisonPreviewProps {
  userId: string;
}

const ComparisonPreview: FC<ComparisonPreviewProps> = ({userId}) => {
  let navigate = useNavigate();
  const [comparisons, setComparisons] = useState<IComparison[]>();

  useEffect(() => {
    if(userId) {
      ComparisonDataService.getAll(userId)
      .then((response: any) => {
        setComparisons(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    } else {
      setComparisons([]);
    }
  }, [userId]);

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
  } else  if (comparisons.length === 0) {
    return <div className="ComparisonPage" data-testid="ComparisonPage">
      Noch keine Vergleiche
      <Button>Loslegen</Button>
    </div>
  } else {
    return <div className="ComparisonPage" data-testid="ComparisonPage">
      <Row>        
        {comparisons.map((comparison, key) => (
          <Col md={6} key={key} className="p-2">
            <Card bg='light' text='dark'>
              <Card.Body>
                <Card.Title>{comparison.name}</Card.Title>
                <Card.Text>
                  {comparison.description}
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

export default ComparisonPreview;
