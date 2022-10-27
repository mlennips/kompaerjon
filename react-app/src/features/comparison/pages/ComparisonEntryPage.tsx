import React, { FC, useState, useEffect } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ComparisonDataService from '../services/ComparisonDataService';
import { IComparisonDetail, IComparisonEntry } from '../types';
import './ComparisonEntryPage.scss';
import { } from "react-icons/bs";


interface ComparisonEntryPageProps {

}

const ComparisonEntryPage: FC<ComparisonEntryPageProps> = () => {
  const [comparisonEntry, setComparisonEntry] = useState<IComparisonEntry>();
  let params = useParams();
  let userId: string = params.userId ?? '';
  let comparisonId: string = params.comparisonId ?? '';
  let entryId: string = params.entryId ?? '';

  useEffect(() => {
    ComparisonDataService.get(comparisonId)
      .then((response: any) => {
        console.log(99, response.data);
        let entries: IComparisonEntry[] = response.data.entries;
        let entry = entries.find(x => x.id == entryId);
        console.log(99, entries, entry);
        setComparisonEntry(entry)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [userId, comparisonId, entryId]);

  if (comparisonEntry) {
    return <Container className="ComparisonEntryPage" data-testid="ComparisonEntryPage">
      <Row>
        <Col>
          Iframe nicht möglich
          <iframe height="900" src={comparisonEntry.url} sandbox='allow-scripts allow-same-origin'></iframe>
        </Col>
      </Row>
    </Container>
  } else {
    return <>...</>
  }
};

export default ComparisonEntryPage;
