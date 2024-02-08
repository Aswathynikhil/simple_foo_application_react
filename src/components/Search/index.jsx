import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { ThemeContext } from '../../App'

const Search = (props) => {

    // console.log(props)
    const { getDataFromSearchComponent ,apiCalledSuccess,setApiCalledSuccess} = props
    const [inputValue, setInputValue] = useState('')
    const {theme} = useContext(ThemeContext)

    const handleInputValue = (event) => {
        const { value } = event.target;
        setInputValue(value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        getDataFromSearchComponent(inputValue)
    }
    useEffect(() => {
        if (apiCalledSuccess) {
            setInputValue('')
            setApiCalledSuccess(false)
        }
    },[apiCalledSuccess,setApiCalledSuccess])

    // console.log(inputValue)
  
  return (
      <form onSubmit={handleSubmit} className='Search'>
          <input name='search'  onChange={handleInputValue}  value={inputValue} placeholder='Search Recipes' id="search"/>
          <button style={theme ? { backgroundColor: '#12343b' } : {}} type='submit'>Search</button>
      </form>
  )
}

export default Search