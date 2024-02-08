import React, { useContext } from 'react'
import './style.css'
import { ThemeContext } from '../../App';

const FavouriteItem = (props) => {
  const { id, image, title, removeFromFavourites } = props;
  const {theme } = useContext(ThemeContext)
  return (
    <div key={id} className='favourite-item'>
      <div>
        <img src={image} alt="image" />
      </div>
      <p style={theme ? { color: '#12343b' } : {}}>{title}</p>
      <button style={theme ? { backgroundColor: '#12343b' } : {}} type="button" onClick={removeFromFavourites}>Remove From Favourites</button>
    </div>

  )
}

export default FavouriteItem;