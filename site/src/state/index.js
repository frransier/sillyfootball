import React, { useReducer, useContext, createContext } from "react"
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"

var initialUser = []
typeof window !== "undefined"
  ? (initialUser =
      JSON.parse(localStorage.getItem("sillyfootball-user-1")) || [])
  : (initialUser = [])
var initialGame = []
typeof window !== "undefined"
  ? (initialGame =
      JSON.parse(localStorage.getItem("sillyfootball-game-1")) || [])
  : (initialGame = [])

const FilterStateContext = createContext()
const UserStateContext = createContext()
const GameStateContext = createContext()
const FilterDispatchContext = createContext()
const UserDispatchContext = createContext()
const GameDispatchContext = createContext()

function Provider(props) {
  const [filters, filterDispatch] = useReducer(filterReducer, [])
  const [game, gameDispatch] = useReducer(gameReducer, initialGame)
  const [user, userDispatch] = useReducer(userReducer, initialUser)
  return (
    <AuthProvider
      navigate={navigate}
      auth0_domain="dev-h964wuhp.eu.auth0.com"
      auth0_client_id="OoBQxwqQpTL7KW38wKH0t0bFDwwXvXYs"
    >
      <UserStateContext.Provider value={user}>
        <UserDispatchContext.Provider value={userDispatch}>
          <FilterStateContext.Provider value={filters}>
            <FilterDispatchContext.Provider value={filterDispatch}>
              <GameStateContext.Provider value={game}>
                <GameDispatchContext.Provider value={gameDispatch}>
                  {props.children}
                </GameDispatchContext.Provider>
              </GameStateContext.Provider>
            </FilterDispatchContext.Provider>
          </FilterStateContext.Provider>
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    </AuthProvider>
  )
}

const useFilterState = () => useContext(FilterStateContext)
const useGameState = () => useContext(GameStateContext)
const useUserState = () => useContext(UserStateContext)
const useUserDispatch = () => useContext(UserDispatchContext)
const useFilterDispatch = () => useContext(FilterDispatchContext)
const useGameDispatch = () => useContext(GameDispatchContext)

export {
  Provider,
  useFilterState,
  useFilterDispatch,
  useGameState,
  useGameDispatch,
  useUserState,
  useUserDispatch,
}

function filterReducer(state, action) {
  switch (action.type) {
    case "init":
      return action.players
    case "filter":
      return [action.homeTeamId, action.awayTeamId]
    case "reset":
      return []
    default:
      return state
  }
}
function gameReducer(state, action) {
  switch (action.type) {
    case "add":
      if (state.length < 5) {
        const player = {
          name: action.player.name || action.player.fullName,
          id: action.player._id,
          team: action.player.team._id,
          logo: action.img,
        }
        localStorage.setItem(
          "sillyfootball-game-1",
          JSON.stringify([...state, player])
        )
        return [...state, player]
      }
      return state
    case "remove":
      const filter = state.filter(x => x.id !== action.player)
      localStorage.setItem("sillyfootball-game-1", JSON.stringify(filter))
      return filter
    case "reset":
      localStorage.setItem("sillyfootball-game-1", JSON.stringify([]))
      return []
    default:
      return state
  }
}

function userReducer(state, action) {
  switch (action.type) {
    case "init":
      if (action.user)
        localStorage.setItem(
          "sillyfootball-user-1",
          JSON.stringify(action.user[0])
        )
      return action.user[0]
    case "reset":
      localStorage.setItem("sillyfootball-user-1", JSON.stringify([]))
      return []
    default:
      return state
  }
}
