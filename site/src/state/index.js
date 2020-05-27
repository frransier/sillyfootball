import React, { useReducer, useContext, createContext } from "react"
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"

var initialUser = []
typeof window !== "undefined"
  ? (initialUser = JSON.parse(localStorage.getItem("sillyfootball")) || null)
  : (initialUser = null)

const UserStateContext = createContext()
const LoadingStateContext = createContext()
const UserDispatchContext = createContext()
const LoadingDispatchContext = createContext()

function Provider(props) {
  const [user, userDispatch] = useReducer(userReducer, initialUser)
  const [loading, loadingDispatch] = useReducer(loadingReducer, false)
  return (
    <AuthProvider
      navigate={navigate}
      auth0_domain="dev-h964wuhp.eu.auth0.com"
      auth0_client_id="OoBQxwqQpTL7KW38wKH0t0bFDwwXvXYs"
    >
      <UserStateContext.Provider value={user}>
        <UserDispatchContext.Provider value={userDispatch}>
          <LoadingStateContext.Provider value={loading}>
            <LoadingDispatchContext.Provider value={loadingDispatch}>
              {props.children}
            </LoadingDispatchContext.Provider>
          </LoadingStateContext.Provider>
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    </AuthProvider>
  )
}

const useUserState = () => useContext(UserStateContext)
const useLoadingState = () => useContext(LoadingStateContext)
const useUserDispatch = () => useContext(UserDispatchContext)
const useLoadingDispatch = () => useContext(LoadingDispatchContext)

export {
  Provider,
  useUserState,
  useUserDispatch,
  useLoadingState,
  useLoadingDispatch
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
