import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import Search from '../../components/Search'
import './style.css'
import RecipeItem from '../../components/Recipe-item'
import FavouriteItem from '../../components/Favourite-item'
import { ThemeContext } from '../../App'
const dummydata = "dummydata"

const reducer = (state, action) => {
  switch (action.type) {
    case 'filterFavourites':
      console.log(action, "action");
      return {
        ...state,
        filteredValue: action.value
      };

    default:
      return state;
  }
}

const initialState = {
  filteredValue: ''
}

const Home = () => {


  // loading state

  const [loadingState, setLoadingState] = useState(false)

  // save result that we get from the api

  const [recipes, setRecipes] = useState([])


  // favourites data state

  const [favourites, setFavourites] = useState([])

  // state for api successfull or not

  const [apiCalledSuccess, setApiCalledSuccess] = useState(false)

  // use reducer functionality

  const [filteredState, dispatch] = useReducer(reducer, initialState)

  const { theme } = useContext(ThemeContext)


  const getDataFromSearchComponent = (getData) => {

    // keep the loading state as true before we are calling the api
    setLoadingState(true)
    // console.log(getData,"jhkjj");


    // calling api

    async function getRecipes() {
      const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=843c380f9df84efe9b1e7c7e2604fb28&query=${getData}`);
      const result = await apiResponse.json();
      const { results } = result;
      if (results && results.length > 0) {
        // set loading state as false again
        // ste the recipe state

        setLoadingState(false);
        setRecipes(results);
        setApiCalledSuccess(true)
      }

      // console.log(result);
    }
    getRecipes();
  }
  // console.log(loadingState, recipes, "loading state,recipes");

  const addToFavourites = useCallback((getCurrentRecipeItem) => {
    let copyFavourites = [...favourites]
    const index = copyFavourites.findIndex(item => item.id === getCurrentRecipeItem.id)
    // console.log(index);
    if (index === -1) {
      copyFavourites.push(getCurrentRecipeItem)
      setFavourites(copyFavourites)
      // save the favourites in local storage
      localStorage.setItem('favourites', JSON.stringify(copyFavourites))
      window.scrollTo({top:"0" , behavior:"smooth"})
    } else {
      alert("tem is alredy present in favourites")
    }
  },[favourites])

  // const addToFavourites = (getCurrentRecipeItem) => {
  //   // console.log(getCurrentRecipeItem);

  //   let copyFavourites = [...favourites]
  //   const index = copyFavourites.findIndex(item => item.id === getCurrentRecipeItem.id)
  //   // console.log(index);
  //   if (index === -1) {
  //     copyFavourites.push(getCurrentRecipeItem)
  //     setFavourites(copyFavourites)
  //     // save the favourites in local storage
  //     localStorage.setItem('favourites', JSON.stringify(copyFavourites))
  //   } else {
  //     alert("tem is alredy present in favourites")
  //   }
  // }

  const removeFromFavourites = (getCurrentId) => {
    let copyFavourites = [...favourites]
    copyFavourites = copyFavourites.filter(item => item.id !== getCurrentId)
    setFavourites(copyFavourites)
    localStorage.setItem('favourites', JSON.stringify(copyFavourites))

  }

  // console.log(favourites, "favourites");
  // console.log(localStorage, "localStorage");
  useEffect(() => {
    console.log("run only once on page load");
    const extractFavouritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem('favourites'))
    // console.log(extractFavouritesFromLocalStorageOnPageLoad, "wxtract");
    setFavourites(extractFavouritesFromLocalStorageOnPageLoad)
  }, [])

  console.log(filteredState, "filteredstate");
  // console.log(favourites, "favourites");

  // filter the favourites

  const filteredFavouritesItems = favourites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  )


  const renderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      return (
        recipes.map((item) =>
          <RecipeItem
            addToFavourites={() => addToFavourites(item)}
            id={item.id}
            image={item.image}
            title={item.title} />
        )
      )
    }
  }, [recipes,addToFavourites])

  return (
    <div className='homepage'>
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummyData={dummydata}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />


      {/* show favourite items */}

      <div className='favourites-wrapper'>
        <h1 style={theme ? { color: '#12343b' } : {}} className='favourites-title'>Favourites</h1>
        <div className='search-favourites'>
          <input
            onChange={(event) => dispatch({ type: 'filterFavourites', value: event.target.value })}
            value={filteredState.filteredValue}
            name="searchfavourites"
            placeholder="Search favourites"
          />
        </div>
        <div className='favourites'>
          {
            !filteredFavouritesItems.length && <div style={{display:'flex',width:"100%" ,justifyContent:"center"}} className='no-items'>No Recipes Found</div>
          }
          {
            filteredFavouritesItems && filteredFavouritesItems.length > 0 ?
              filteredFavouritesItems.map(item => (
                <FavouriteItem
                  removeFromFavourites={() => removeFromFavourites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
              : null
          }
        </div>
      </div>

      {/* show loading state */}
      {
        loadingState &&
        <div className='loading'>
          Loading Recipes... Please wait
        </div>
      }
      {/* show loading states */}
      {/* map through al the recipes */}
      <div className="items">
        {
          renderRecipes()
        }
        {/* {
          recipes && recipes.length > 0 ?
            recipes.map((item) =>
              <RecipeItem
                addToFavourites={() => addToFavourites(item)}
                id={item.id}
                image={item.image}
                title={item.title} />
            ) : null
        } */}
      </div>

      {/* map through all the recipes */}

      {
        !loadingState && !recipes.length && <div className='no-items'> No Recipes Found... </div>
      }

    </div>
  )
}

export default Home