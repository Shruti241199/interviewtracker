import { useState } from 'react';

export default function Status({ round }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <span
      className={
        round.status === 'Cleared'
          ? 'cleared'
          : round.status === 'In Progress'
            ? 'in_progress'
            : 'not_cleared'
      }
    >
      <div className={`flippable-button ${isFlipped ? 'flipped' : ''}`}>
        {!isFlipped ? (
          <div className="front">
            <div
              className='circle'
              style={{
                backgroundColor:
                  round.status === 'Cleared'
                    ? 'green'
                    : round.status === 'In Progress'
                      ? 'yellow'
                      : 'red'
              }}
              onClick={handleClick}
            ></div>
          </div>
        ) : (
          <div className="back">
            <div
              className='circle circle-back'
              style={{
                backgroundColor:
                  round.status === 'Cleared'
                    ? 'green'
                    : round.status === 'In Progress'
                      ? 'yellow'
                      : 'red',
                color: 
                round.status === 'Cleared'
                  ? 'white'
                  : round.status === 'In Progress'
                    ? 'black'
                    : 'white'
              }}
              onClick={handleClick}
            >
              {round.percentage}
            </div>
          </div>
        )}
      </div>
    </span>
  );
}
