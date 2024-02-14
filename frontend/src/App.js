import { useEffect, useState } from 'react';
import './App.css';
import { CandidateCard } from './components/CandidateCard';
import { Button, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import axiosUsers from './components/httpurl';
// const data = require('./data/data.json');

function App() {
  const [candidateData, setCandidateData] = useState([]);

  const handleSendEmail = async () => {
      axiosUsers.post("")
        .then((response) => {
          alert(response.data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }

  const fetchCandidateData = async () => {
    try {
      const response = await axiosUsers.get('');
      setCandidateData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchCandidateData();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interview Tracker</h1>
      </header>
      <div className="send-email-button">
        <Button primary onClick={handleSendEmail}>Send Email</Button>
      </div>
      <div className="cards-div">
        <Grid columns={4} doubling stackable>
          <GridRow>
            {candidateData &&
              candidateData.map((candidate, index) => {
                return (
                  <GridColumn key={index}>
                    <div className="card-div">
                      <CandidateCard candidate={candidate} />
                    </div>
                  </GridColumn>
                );
              })}
          </GridRow>
        </Grid>
      </div>
    </div>
  );
}

export default App;