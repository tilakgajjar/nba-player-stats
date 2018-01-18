import { takeLatest, all } from 'redux-saga/effects'

import * as TYPES from '../types'
import { fetchPerson, fetchStats } from '../actions'

function* mySaga() {
  yield all([takeLatest(TYPES.FETCH_PLAYER_ID_REQUEST, fetchPerson),
        takeLatest(TYPES.FETCH_PLAYER_STATS_REQUEST, fetchStats)])
}

export default mySaga
