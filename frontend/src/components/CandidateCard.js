import React from 'react';
import Status from './Status';

export const CandidateCard = ({ candidate }) => {
  return (
    <>
      <div className="overall-status-div">
        <span style={{ color: 'blue', fontWeight: 'bold', fontSize: '1.5em' }}>
          {candidate.name}
        </span>
        <span>{candidate.currentStatus}</span>
      </div>
      <div class="separator"></div>
      <ul>
        {candidate?.rounds.map((round, index) => {
          return (
            <li key={index}>
              <div className="rounds-div">
                <span>{round.name}</span>
                <Status round={round} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
