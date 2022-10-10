import React, { useEffect, useState, FC } from 'react';
import { useParams } from "react-router-dom";
import './AnalyseMatrix.scss';
import { Spinner, Stack } from 'react-bootstrap';

interface AnalyseMatrixProps {
  urls: string[];
}

const AnalyseMatrix: FC<AnalyseMatrixProps> = (props: AnalyseMatrixProps) => {
  let params = useParams();
  let userId: string = params.userId ?? '';

  const [analyseResults, setAnalyseResults] = useState<any>(null);

  useEffect(() => {
    retrieveAnalyseResults();
  }, []);

  const retrieveAnalyseResults = () => {

  };

  if (analyseResults) {
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
