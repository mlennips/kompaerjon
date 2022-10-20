import React, { useEffect, useState, FC } from 'react';
import './AnalyseMatrix.scss';
import { Spinner, Stack } from 'react-bootstrap';
import ComparisonDataService from '../../services/ComparisonDataService';

interface AnalyseMatrixProps {
  comparisonId: string;
}

const AnalyseMatrix: FC<AnalyseMatrixProps> = (props: AnalyseMatrixProps) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    ComparisonDataService.getAnalysis(props.comparisonId)
    .then((response: any) => {
      setAnalysis(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }, [props.comparisonId]);

  useEffect(() => {
    retrieveAnalyseResults();
  }, []);

  const retrieveAnalyseResults = () => {

  };

  if (analysis) {
    return <div data-testid="AnalyseMatrix">
      Done
    </div>
  } else {
    return <div data-testid="AnalyseMatrix">
      <Stack direction='horizontal'>
        <Spinner animation='border' size='sm'></Spinner>
        <span className='mx-2'>Bitte warten</span>
      </Stack>
    </div>
  }
};

export default AnalyseMatrix;
