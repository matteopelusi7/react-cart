import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import {} from "./actions";
const url = "https://react--course-api.herokuapp.com/api/v1/data/cart";

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    return <AppContext.Provider value='context'>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}