import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useScript from '../utils/hooks/useScript';

const GameDetail: React.FC<{game: string}> = ({game}) => {
  const history = useHistory();
  const status = useScript('/vendor/comeon.game-1.0.min.js');

  const navigateBackHandler = useCallback((): void => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if(status === 'ready') {
      // @ts-ignore
      comeon.game.launch(game);
    }
  }, [game, status])

  return (
    <div className="ingame">
      <div className="ui grid centered">
        <div className="three wide column">
          <div className="ui right floated secondary button inverted" onClick={navigateBackHandler}>
            <i className="left chevron icon"/>Back
          </div>
        </div>
        <div className="ten wide column">
          <div id="game-launch">
          </div>
        </div>
        <div className="three wide column"/>
      </div>
    </div>
  );
}

export default GameDetail;
