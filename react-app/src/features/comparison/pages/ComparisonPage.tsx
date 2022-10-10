import React, { FC, useState, useEffect } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ComparisonDataService from '../services/ComparisonDataService';
import { IComparison } from '../types';
import './ComparisonPage.scss';
import { BsTrash, BsPencilSquare, BsBoxArrowRight } from "react-icons/bs";
import { openInNewTab } from '../../../utils/helpers/browser';
import AnalyseMatrix from '../components/AnalyseMatrix/AnalyseMatrix';

interface ComparisonPageProps {

}

const ComparisonPage: FC<ComparisonPageProps> = () => {
  const [comparison, setComparison] = useState<IComparison>();
  let navigate = useNavigate();
  let params = useParams();
  let userId: string = params.userId ?? '';
  let comparisonId: string = params.comparisonId ?? '';

  useEffect(() => {
    retrieveComparisons();
  }, []);

  const retrieveComparisons = () => {
    ComparisonDataService.get(userId, comparisonId)
      .then((response: any) => {
        setComparison(response.data);
      })
      .catch((e: Error) => {
        console.log(99, e);
      });
  };

  // if (comparison?.urls) {
  //   await ComparisonAnalyseService.start(comparison.urls)
  //   .then((response: any) => {
  //     setAnalyseResult(response);
  //   })
  //   .catch((e: Error) => {
  //     console.log(99, e);
  //   });
  // }

  if (comparison) {
    return <Container className="ComparisonPage" data-testid="ComparisonPage">
    <Row className='pt-5'>
      <Col sm={12}><h3>{comparison.name}</h3></Col>
      <Col md={12}>
        Lorem ipsum...
      </Col>
    </Row>
    <Row className='pt-5'>
      <Col sm={12}><h4>Einträge</h4></Col>
      {comparison?.urls?.map((url, key) => (
        <Col md={3} key={key}>
          {entryCard(key, url)}
        </Col>
      ))}
    </Row>
    <Row className='pt-5'>
      <Col xs={12}>
        <h4>Ergebnis</h4>
      </Col>
      <Col>
      <AnalyseMatrix urls={comparison.urls ?? []} />
      </Col>
    </Row>
  </Container>
  } else {
    return <>...</>
  }

  function entryCard(key: number, url: string) {
    return <Card>
      <Card.Body>
        <Card.Title>#{key}</Card.Title>
        <Card.Text>{url}</Card.Text>
        <ButtonGroup aria-label="Eintrag Aktionen">
          <Button variant="light" onClick={() => navigate(`/users/${userId}/comparisons/${comparisonId}/entries/0`)}><BsPencilSquare /></Button>
          <Button variant="light" onClick={() => openInNewTab(url)}><BsBoxArrowRight /></Button>
          <Button variant="light" onClick={() => { }}><BsTrash /></Button>
        </ButtonGroup>
      </Card.Body>
    </Card>;
  }
};

export default ComparisonPage;
