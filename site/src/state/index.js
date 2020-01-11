import React, { useReducer, useContext, createContext } from "react"
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"

var initialUser = []
typeof window !== "undefined"
  ? (initialUser =
      JSON.parse(localStorage.getItem("sillyfootball-user-1")) || [])
  : (initialUser = [])

const PlayerStateContext = createContext()
const UserStateContext = createContext()
const GameStateContext = createContext()
const PlayerDispatchContext = createContext()
const UserDispatchContext = createContext()
const GameDispatchContext = createContext()

function Provider(props) {
  const [players, playerDispatch] = useReducer(playerReducer, [])
  const [game, gameDispatch] = useReducer(gameReducer, [])
  const [user, userDispatch] = useReducer(userReducer, initialUser)
  return (
    <AuthProvider
      navigate={navigate}
      auth0_domain="dev-h964wuhp.eu.auth0.com"
      auth0_client_id="OoBQxwqQpTL7KW38wKH0t0bFDwwXvXYs"
    >
      <UserStateContext.Provider value={user}>
        <UserDispatchContext.Provider value={userDispatch}>
          <PlayerStateContext.Provider value={players}>
            <PlayerDispatchContext.Provider value={playerDispatch}>
              <GameStateContext.Provider value={game}>
                <GameDispatchContext.Provider value={gameDispatch}>
                  {props.children}
                </GameDispatchContext.Provider>
              </GameStateContext.Provider>
            </PlayerDispatchContext.Provider>
          </PlayerStateContext.Provider>
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    </AuthProvider>
  )
}

const usePlayerState = () => useContext(PlayerStateContext)
const useGameState = () => useContext(GameStateContext)
const useUserState = () => useContext(UserStateContext)
const useUserDispatch = () => useContext(UserDispatchContext)
const usePlayerDispatch = () => useContext(PlayerDispatchContext)
const useGameDispatch = () => useContext(GameDispatchContext)

export {
  Provider,
  usePlayerState,
  usePlayerDispatch,
  useGameState,
  useGameDispatch,
  useUserState,
  useUserDispatch,
}

function playerReducer(state, action) {
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
        return [...state, player]
      }
      return state
    case "remove":
      const filter = state.filter(x => x.id !== action.player)
      return filter
    default:
      return state
  }
}

function userReducer(state, action) {
  switch (action.type) {
    case "init":
      console.log("init")
      console.log(action.user)
      if (action.user)
        localStorage.setItem(
          "sillyfootball-user-1",
          JSON.stringify(action.user[0])
        )
      return action.user[0]
    case "reset":
      console.log("reset")
      localStorage.setItem("sillyfootball-user-1", JSON.stringify([]))
      return []
    default:
      return state
  }
}
