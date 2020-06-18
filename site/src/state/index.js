import React, { useReducer, useContext, createContext } from "react"
import { Auth0Provider } from "./auth0"

var initialState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("sillyfootball")) || null
      : null,
  loading: false,
  live: false
}

const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

function Provider(props) {
  const [global, globalDispatch] = useReducer(globalReducer, initialState)
  return (
    <Auth0Provider
      domain="dev-h964wuhp.eu.auth0.com"
      client_id="OoBQxwqQpTL7KW38wKH0t0bFDwwXvXYs"
      redirect_uri="http://localhost:8000/auth0_callback"
    >
      <GlobalStateContext.Provider value={global}>
        <GlobalDispatchContext.Provider value={globalDispatch}>
          {props.children}
        </GlobalDispatchContext.Provider>
      </GlobalStateContext.Provider>
    </Auth0Provider>
  )
}

const useGlobalState = () => useContext(GlobalStateContext)
const useGlobalDispatch = () => useContext(GlobalDispatchContext)

export { Provider, useGlobalState, useGlobalDispatch }

function globalReducer(state, action) {
  switch (action.type) {
    case "set-loading":
      return { ...state, loading: action.payload }
    case "set-live":
      return false
    case "set-user":
      localStorage.setItem("sillyfootball", JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    default:
      return state
  }
}
