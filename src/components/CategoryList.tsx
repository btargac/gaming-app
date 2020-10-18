import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import { fetchCategories, selectCategory, selectedCategory, selectCategories } from '../store/slices/categoriesSlice';

const CategoryList: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const activeCategory = useSelector(selectedCategory);

  const categoryChangeHandler = useCallback((categoryId: number) => {
    dispatch(selectCategory(categoryId));
  }, [dispatch]);

  useEffect(() =>{
    dispatch(fetchCategories());
  },[dispatch]);

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

  return(
    <div className="four wide column">
      <h3 className="ui dividing header">Categories</h3>
      { categoryList }
    </div>
  )
}

export default React.memo(CategoryList);
