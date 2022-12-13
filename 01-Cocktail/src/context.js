import React, { useContext,useEffect,useReducer } from 'react'
import reducer from './reducer'

const AppContext = React.createContext()

const initialState = {
  loading:false,
  cocktails:[],
  searchTerm:'a'

}

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const AppProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)

  const fetchData = async () =>{
    dispatch({type:'LOADING'})
    const response = await fetch(`${url}${state.searchTerm}`)
    const data = await response.json()
    
    
    
    try {
      if(data.drinks){
        let tempCocktails = data.drinks.map((drink) => {
          return {
            id: drink.idDrink,
            image: drink.strDrinkThumb,
            name: drink.strDrink,
            info: drink.strAlcoholic,
            glass:drink.strGlass,
          }
        })
        dispatch({ type: 'DISPLAY_ITEMS', payload: tempCocktails })
      }else{
        dispatch({ type: 'DISPLAY_ITEMS', payload: [] })
      }
    } catch (error) {
      console.log(error)
      dispatch({type:'_LOADING'})
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
