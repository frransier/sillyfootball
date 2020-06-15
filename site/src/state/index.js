import React, { useReducer, useContext, createContext } from "react"

var initialUser = []
typeof window !== "undefined"
  ? (initialUser = JSON.parse(localStorage.getItem("sillyfootball")) || null)
  : (initialUser = null)

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

const UserStateContext = createContext()
const LoadingStateContext = createContext()
const UserDispatchContext = createContext()
const LoadingDispatchContext = createContext()

function Provider(props) {
  const [user, userDispatch] = useReducer(userReducer, initialUser)
  const [loading, loadingDispatch] = useReducer(loadingReducer, false)
  const [global, globalDispatch] = useReducer(globalReducer, initialState)
  return (
    <GlobalStateContext.Provider value={global}>
      <GlobalDispatchContext.Provider value={globalDispatch}>
        <UserStateContext.Provider value={user}>
          <UserDispatchContext.Provider value={userDispatch}>
            <LoadingStateContext.Provider value={loading}>
              <LoadingDispatchContext.Provider value={loadingDispatch}>
                {props.children}
              </LoadingDispatchContext.Provider>
            </LoadingStateContext.Provider>
          </UserDispatchContext.Provider>
        </UserStateContext.Provider>
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

const useUserState = () => useContext(UserStateContext)
const useLoadingState = () => useContext(LoadingStateContext)
const useUserDispatch = () => useContext(UserDispatchContext)
const useLoadingDispatch = () => useContext(LoadingDispatchContext)
const useGlobalState = () => useContext(GlobalStateContext)
const useGlobalDispatch = () => useContext(GlobalDispatchContext)

export {
  Provider,
  useUserState,
  useUserDispatch,
  useLoadingState,
  useLoadingDispatch,
  useGlobalState,
  useGlobalDispatch
}

function userReducer(state, action) {
  switch (action.type) {
    case "init":
      if (action.user) {
        localStorage.removeItem("sillyfootball-user-1")
        localStorage.setItem("sillyfootball", JSON.stringify(action.user))
      }
      return action.user
    case "reset":
      localStorage.removeItem("sillyfootball-user-1")
      localStorage.removeItem("sillyfootball")
      return null
    default:
      return state
  }
}
function loadingReducer(state, action) {
  switch (action.type) {
    case "set":
      return action.loading
    case "reset":
      return false
    default:
      return state
  }
}
function globalReducer(state, action) {
  switch (action.type) {
    case "set-loading":
      return { ...state, loading: action.payload }
    case "set-live":
      return false
    case "set-user":
      return false
    default:
      return state
  }
}
