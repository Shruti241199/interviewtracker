import { useState } from 'react';
import { Button } from 'semantic-ui-react';

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
            <Button
              color={
                round.status === 'Cleared'
                  ? 'green'
                  : round.status === 'In Progress'
                  ? 'yellow'
                  : 'red'
              }
              circular
              icon="round"
              size="mini"
              onClick={handleClick}
            />
          </div>
        ) : (
          <div className="back">
            <Button
              content="0"
              color={
                round.status === 'Cleared'
                  ? 'green'
                  : round.status === 'In Progress'
                  ? 'yellow'
                  : 'red'
              }
              circular
              icon="round"
              size="mini"
              onClick={handleClick}
            />
          </div>
        )}
      </div>
    </span>
  );
}
