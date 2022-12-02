import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { DATA_FETCHING_FAIL, DATA_FETCHING_STARTED, DATA_FETCHING_SUCCESS, DELETE_ITEM, SVUOTA_CARRELLO } from "./actions";
import axios from 'axios';
const url = "https://react--course-api.herokuapp.com/api/v1/data/cart";

const initialState = {
    products: [],
    isLoading: true,
    isError: false,
    total: 0,
    itemCounter: 0
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    //utilizzo use reducer con state iniziale
    const [state, dispatch] = useReducer(reducer, initialState)

    //cancella item
    const deleteItem = (_id) => {
        dispatch({type: DELETE_ITEM, payload: _id})
    }


    //svuota carrello
    const deleteAll = () => {
        dispatch({type: SVUOTA_CARRELLO})
    }

    //data fetching
    useEffect(() => {
      (async() => {
        dispatch({type: DATA_FETCHING_STARTED})
        try {
            const response = await axios.get(url)
            dispatch({type: DATA_FETCHING_SUCCESS, payload: response.data.data})
        } catch (err) {
            dispatch({type: DATA_FETCHING_FAIL})
        }
      })()
    }, [])
    
    return (
        <AppContext.Provider
            value={{
                ...state,
                deleteItem,
                deleteAll
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}