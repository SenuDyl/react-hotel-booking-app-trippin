import React, { createContext, useReducer } from 'react';
import { useEffect } from 'react';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

//hold our global authentication state
export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])    // update the localStorage whenever the user state changes, ensuring that user data persists across page reloads
    return (
        //Authentication state is made available to all components that need it, without needing to pass props down multiple levels
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error, dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );
};
