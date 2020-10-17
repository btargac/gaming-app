import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout, selectAuth } from '../store/slices/authSlice';

const Games: React.FC = () =>{
  const dispatch = useDispatch();
  const { player } = useSelector(selectAuth);

  const logoutHandler = () => {
    if (player) {
      const nameRegex =/^(\w+)/i;
      const name = player.name.match(nameRegex)?.[0].toLowerCase() ?? '';

      dispatch(logout({username: name}));
    }
  }

  return (
    <div className="casino">
      <div className="ui grid centered">
        <div className="twelve wide column">
          <div className="ui list">

            {/*player item template*/}
            <div className="player item">
              <img className="ui avatar image" src="" alt="avatar"/>

                <div className="content">
                  <div className="header"><b className="name"/></div>
                  <div className="description event"/>
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

          <div className="ui relaxed divided game items links">

            {/*game item template*/}
            <div className="game item">
              <div className="ui small image">
                <img src="" alt="game-icon"/>
              </div>
              <div className="content">
                <div className="header"><b className="name"/></div>
                <div className="description">
                </div>
                <div className="extra">
                  <div className="play ui right floated secondary button inverted">
                    Play
                    <i className="right chevron icon"/>
                  </div>

                </div>
              </div>
            </div>
            {/*end game item template*/}

          </div>
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
