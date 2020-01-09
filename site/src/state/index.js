import React, { useReducer, useContext, createContext } from "react"
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"

const PlayerStateContext = createContext()
const GameStateContext = createContext()
const PlayerDispatchContext = createContext()
const GameDispatchContext = createContext()

function Provider(props) {
  const [players, playerDispatch] = useReducer(playerReducer, [])
  const [game, gameDispatch] = useReducer(gameReducer, [])
  return (
    <AuthProvider
      navigate={navigate}
      auth0_domain="dev-h964wuhp.eu.auth0.com"
      auth0_client_id="OoBQxwqQpTL7KW38wKH0t0bFDwwXvXYs"
    >
      <PlayerStateContext.Provider value={players}>
        <PlayerDispatchContext.Provider value={playerDispatch}>
          <GameStateContext.Provider value={game}>
            <GameDispatchContext.Provider value={gameDispatch}>
              {props.children}
            </GameDispatchContext.Provider>
          </GameStateContext.Provider>
        </PlayerDispatchContext.Provider>
      </PlayerStateContext.Provider>
    </AuthProvider>
  )
}

const usePlayerState = () => useContext(PlayerStateContext)
const useGameState = () => useContext(GameStateContext)
const usePlayerDispatch = () => useContext(PlayerDispatchContext)
const useGameDispatch = () => useContext(GameDispatchContext)

export {
  Provider,
  usePlayerState,
  usePlayerDispatch,
  useGameState,
  useGameDispatch,
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
