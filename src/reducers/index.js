import { combineReducers } from 'redux'
import * as TYPES from '../types'

const initialState = {
    people: [],
    stats: [],
    player: [],
    isShow: false,
    isShowResultsComp: true,
    err: {
            firstNameInputErr: false,
            lastNameInputErr: false,
            yearInputErr: false
          }
}

const handlePlayerIdFetchSuccess = (state, action) => {
    return {
      ...state,
      people : action.data
    }
}

const handlePlayerStatsSuccess = (state, action) => {
  console.log(action);
  return {
      ...state,
      stats : action.data
  }
}

const handlePlayerNameYear = (state, action) => {
  console.log(action);
  return{
      ...state,
      player: action.data
  }
}

const handleHideResults = (state, action) => {
  console.log(action);
  return{
      ...state,
      isShow: action.show,
  }
}

const handleHideResultsComp = (state, action) => {
  console.log(action);
  return{
      ...state,
      isShowResultsComp: action.data,
  }
}

const handleInputError = (state, action) => {
  console.log(action);
  return{
      ...state,
      err: {
        firstNameInputErr: action.err.f,
        lastNameInputErr: action.err.l,
        yearInputErr: action.err.y
      }
  }
}

const playerInfo = (state = initialState, action) => {
    const handlers = {
        [TYPES.FETCH_PLAYER_ID_SUCCESS]: handlePlayerIdFetchSuccess,
        [TYPES.FETCH_PLAYER_STATS_SUCCESS]: handlePlayerStatsSuccess,
        [TYPES.FETCH_PLAYER_NAME_YEAR]: handlePlayerNameYear,
        [TYPES.HIDE_RESULTS]: handleHideResults,
        [TYPES.HIDE_RESULTS_COMP]: handleHideResultsComp,
        [TYPES.SHOW_INPUT_ERROR]: handleInputError
    }

    return handlers[action.type]
        ? handlers[action.type](state, action)
        : state
}

const rootReducer = combineReducers({
  playerInfo
})

export default rootReducer
