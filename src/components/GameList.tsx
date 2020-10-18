import React from 'react';

import { Game } from '../store/slices/gamesSlice';

const GameList: React.FC<{games: Game[], playHandler: (code: string) => void}> = ({games, playHandler}) => {
  return(
    <div className="twelve wide column">
      <h3 className="ui dividing header">Games</h3>
      <div className="ui relaxed divided game items links">
        {
          games
            .map(game => (
              <div className="game item" key={game.code}>
                <div className="ui small image">
                  <img src={`/${game.icon}`} alt="game-icon"/>
                </div>
                <div className="content">
                  <div className="header"><strong className="name">{game.name}</strong></div>
                  <div className="description">{game.description}</div>
                  <div className="extra">
                    <div className="play ui right floated secondary button inverted" onClick={() => playHandler(game.code)}>
                      Play
                      <i className="right chevron icon"/>
                    </div>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default React.memo(GameList);
