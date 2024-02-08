import React, { useContext } from 'react'
import './style.css'
import { ThemeContext } from '../../App';

const RecipeItem = (props) => {

  const { id, image, title, addToFavourites } = props;
  const {theme} =useContext(ThemeContext)
  // console.log(props,'recipeItem props');
    return (
      <div key={id} className='recipe-item'>
        <div>
          <img src={image} alt="image" />
        </div>
        <p style={theme ? { color:'#12343b'} :{}}>{title}</p>
        <button style={theme ? { backgroundColor: '#12343b' } : {}} type="button" onClick={addToFavourites}>Add to Favourites</button>
      </div>
 
  )
}

export default RecipeItem;