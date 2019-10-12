import React, { useReducer, useContext, createContext } from "react"
import Intercom from "react-intercom"

const StateContext = createContext()
const DispatchContext = createContext()

function playerReducer(state, action) {
  switch (action.type) {
    case "add":
      if (state.length > 4 || state.includes(action.hit)) {
        return state
      } else {
        return [...state, action.hit]
      }
    case "remove":
      return state.filter((_, index) => index !== action.index)
    case "clear-state":
      return []
    default:
      return state
  }
}

function Provider(props) {
  const [state, dispatch] = useReducer(playerReducer, [])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Intercom appId="entknhmw" />
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const useStateContext = () => useContext(StateContext)
const useDispatchContext = () => useContext(DispatchContext)

export { Provider, useStateContext, useDispatchContext }
