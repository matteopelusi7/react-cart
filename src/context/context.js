import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { AUMENTA_QTY, COSTO_TOTALE, CONTATORE, DATA_FETCHING_FAIL, DATA_FETCHING_STARTED, DATA_FETCHING_SUCCESS, DELETE_ITEM, DIMINUISCI_QTY, SVUOTA_CARRELLO } from "./actions";
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

    const addQty = (_id) => {
        dispatch({type: AUMENTA_QTY, payload: _id})
    }

    const dimQty = (_id) => {
        dispatch({type: DIMINUISCI_QTY, payload: _id})
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


    //aggiorna costo totale e numero elemnto nel carrello
    useEffect(() => {
        dispatch({ type: COSTO_TOTALE });
        dispatch({ type: CONTATORE });
    }, [state.products]);
    
    return (
        <AppContext.Provider
            value={{
                ...state,
                deleteItem,
                deleteAll,
                addQty,
                dimQty
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