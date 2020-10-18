import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { logout, selectAuth } from '../store/slices/authSlice';
import { fetchGames, selectGames } from '../store/slices/gamesSlice';

const Games: React.FC = () =>{
  const dispatch = useDispatch();
  const { isAuthenticated, player } = useSelector(selectAuth);
  const games = useSelector(selectGames);
  const history = useHistory();

  const logoutHandler = () => {
    if (player) {
      const nameRegex =/^(\w+)/i;
      const name = player.name.match(nameRegex)?.[0].toLowerCase() ?? '';

      dispatch(logout({username: name}));
    }
  }

  const playHandler = (code: string): void => {
    // navigate to a relative path where game play is handled
    history.push(`/games/${code}`);
  }

  useEffect(() =>{
    if (!isAuthenticated) {
      return history.push('/login');
    }

    dispatch(fetchGames());
  },[isAuthenticated])

  const gameList = useMemo(() => {
    return(
      <div className="ui relaxed divided game items links">
        {
          games.map(game => (
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
        ))}
      </div>)
  }, [games])

  return (
    <div className="casino">
      <div className="ui grid centered">
        <div className="twelve wide column">
          <div className="ui list">

            {/*player item template*/}
            <div className="player item">
              <img className="ui avatar image" src={`/${player?.avatar}`} alt="avatar"/>

                <div className="content">
                  <div className="header"><strong className="name">{player?.name}</strong></div>
                  <div className="description event">{player?.event}</div>
                </div>
            </div>
            {/*end player item template*/}

          </div>
          <div className="logout ui left floated secondary button inverted" onClick={logoutHandler}>
            <i className="left chevron icon"/>Log Out
          </div>
        </div>
        <div className="four wide column">
          <div className="search ui small icon input ">
            <input type="text" placeholder="Search Game"/>
              <i className="search icon"/>
          </div>
        </div>
      </div>
      <div className="ui grid">
        <div className="twelve wide column">
          <h3 className="ui dividing header">Games</h3>
          {gameList}
        </div>
        <div className="four wide column">
          <h3 className="ui dividing header">Categories</h3>

          <div className="ui selection animated list category items">

            {/*category item template*/}
            <div className="category item">
              <div className="content">
                <div className="header"/>
              </div>
            </div>
            {/*end category item template*/}

          </div>
        </div>
      </div>

    </div>
  );
}

export default Games;
