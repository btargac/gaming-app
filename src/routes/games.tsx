import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import cx from 'classnames';

import GameDetail from '../components/GameDetail';
import GameList from '../components/GameList';
import { logout, selectAuth } from '../store/slices/authSlice';
import { fetchCategories, selectCategory, selectedCategory, selectCategories } from '../store/slices/categoriesSlice';
import { Game, fetchGames, selectGames } from '../store/slices/gamesSlice';

const Games: React.FC = () => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, player } = useSelector(selectAuth);
  const categories = useSelector(selectCategories);
  const activeCategory = useSelector(selectedCategory);
  const games = useSelector(selectGames);
  const history = useHistory();
  let { game } = useParams() as {game: string};

  const logoutHandler = () => {
    if (player) {
      const nameRegex =/^(\w+)/i;
      const name = player.name.match(nameRegex)?.[0].toLowerCase() ?? '';

      dispatch(logout({username: name}));
    }
  }

  const searchHandler = useCallback(evt => {
    setSearchTerm(evt.target.value);
  }, [])

  const categoryChangeHandler = useCallback((categoryId: number) => {
    dispatch(selectCategory(categoryId));
  }, [dispatch]);

  const playHandler = useCallback((code: string): void => {
    // navigate to a relative path where game play is handled
    history.push(`/games/${code}`);
  }, [history]);

  useEffect(() =>{
    if (!isAuthenticated) {
      return history.push('/login');
    }

    dispatch(fetchCategories());
    dispatch(fetchGames());
  },[isAuthenticated, history, dispatch])

  const filteredGameList: Game[] = useMemo(() => {
    const loweredSearchTerm = searchTerm.toLowerCase();
    // filter games for both searchTerm and activeCategory
    return (searchTerm
      ? games.filter(
        game =>
          game.name.toLowerCase().includes(loweredSearchTerm)
          || game.description.toLowerCase().includes(loweredSearchTerm)
      ) : games).filter(game => game.categoryIds.includes(activeCategory));
  }, [games, activeCategory, searchTerm])

  const categoryList = useMemo(() => (
    <div className="ui selection animated list category items">
      {
        categories.map(category => {
          const categoryClass = cx('category item', {
            'active': category.id === activeCategory
          })

          return (
            <div className={categoryClass} key={category.id} onClick={() => categoryChangeHandler(category.id)}>
              <div className="content">
                <div className="header">
                  {category.name}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  ),[categories, activeCategory, categoryChangeHandler])

  return (
    <div className="casino">
      <div className="ui grid centered">
        <div className="twelve wide column">
          <div className="ui list">

            <div className="player item">
              <img className="ui avatar image" src={`/${player?.avatar}`} alt="avatar"/>
                <div className="content">
                  <div className="header"><strong className="name">{player?.name}</strong></div>
                  <div className="description event">{player?.event}</div>
                </div>
            </div>

          </div>
          <div className="logout ui left floated secondary button inverted" onClick={logoutHandler}>
            <i className="left chevron icon"/>Log Out
          </div>
        </div>
        <div className="four wide column">
          <div className="search ui small icon input ">
            <input type="text" placeholder="Search Game" onChange={searchHandler}/>
              <i className="search icon"/>
          </div>
        </div>
      </div>
      {game ? <GameDetail game={game}/> : (
        <div className="ui grid">
          <GameList games={filteredGameList} playHandler={playHandler}/>
          <div className="four wide column">
            <h3 className="ui dividing header">Categories</h3>
            {categoryList}
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;
