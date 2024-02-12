import './App.css';
import { CandidateCard } from './components/CandidateCard';
import { Button, Grid, GridColumn, GridRow } from 'semantic-ui-react';

const data = require('./data/data.json');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interview Tracker</h1>
      </header>
      <div className="send-email-button">
        <Button primary>Send Email</Button>
      </div>
      <div className="cards-div">
        <Grid columns={4} doubling stackable>
          <GridRow>
            {data &&
              data.map((candidate, index) => {
                return (
                  <GridColumn key={index}>
                    <div className="card-div" fluid>
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
