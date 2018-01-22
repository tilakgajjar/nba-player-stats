import { call, put } from 'redux-saga/effects'
import * as TYPES from '../types'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response; // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export const api = (url) => {
  return fetch(url, {
    accept: 'application/json',
  }).then(checkStatus)
  .then(parseJSON);
}
//actions
export const fetchPlayerIDRequest = (fname, lname, year) => ({
    type: TYPES.FETCH_PLAYER_ID_REQUEST,
    fname: fname,
    lname: lname,
    year: year
})

export const fetchPlayerStatsRequest = (data) => ({
  type: TYPES.FETCH_PLAYER_STATS_REQUEST,
  data: data
})

export const fetchPlayerNameYear = (data) => ({
  type: TYPES.FETCH_PLAYER_NAME_YEAR,
  data: data
})

export const hideResult = (show) => ({
  type: TYPES.HIDE_RESULTS,
  show: show,
})

export const hideResultComp = (hide) => ({
  type: TYPES.HIDE_RESULTS_COMP,
  hide: hide
})

export const showInputError = (err) => ({
  type: TYPES.SHOW_INPUT_ERROR,
  firstNameInput: err.f,
  lastNameInput: err.l,
  yearInput: err.y
})


const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Accept', 'application/json')

export function* fetchPerson(action) {
    //console.log(action, 'fetch person');
   try {
      if((action.fname==='' && action.lname==='') || action.year===''){
        //console.log('Player name and year not valid');
        let err = {f: true, l: true, y: true}
        yield put({type: TYPES.SHOW_INPUT_ERROR, err});
      }else {
        const person = yield call(api, `http://10.16.7.38:5000/player?api_key=TRKfInZOuCY6UvjFLWPxDq70rVHaA8yJ&first_name=${action.fname}&last_name=${action.lname}`);
        yield put({type: TYPES.FETCH_PLAYER_ID_SUCCESS, data: person});
        let pl_id = person.map(person => person.id);
        let pl_name = person.map(person => person.player_name);
        //console.log(pl_id, 'in fetchPerson');
        if(pl_id.length>1){
          let show = true
          yield put({type: TYPES.HIDE_RESULTS, show});
        }

        if(pl_id.length===1){
          //console.log('in');
          let data = { id: pl_id[0], year: action.year, name: pl_name }
          yield put({type: TYPES.FETCH_PLAYER_STATS_REQUEST, data});
        }
      }

   } catch (e) {
     let data = false
     yield put({type: TYPES.HIDE_RESULTS_COMP, data});
     let err = {f: true, l: true, y: false}
     yield put({type: TYPES.SHOW_INPUT_ERROR, err});
     //console.log('Please check the player name')
   }
}

export function* fetchStats(action) {
  //console.log(action, 'fetch stats');
  try{
    const stats = yield call(api, `http://10.16.7.38:5000/boxscore?api_key=TRKfInZOuCY6UvjFLWPxDq70rVHaA8yJ&player_id=${action.data.id}&year=${action.data.year}`);
    yield put({type: TYPES.FETCH_PLAYER_STATS_SUCCESS, data: stats});
    //console.log(stats);
    let data = { name: action.data.name, year: action.data.year }
    yield put({type: TYPES.FETCH_PLAYER_NAME_YEAR, data: data});
    let resultsComp = true
    yield put({type: TYPES.HIDE_RESULTS_COMP, data: resultsComp});
    let err = {f: false, l: false, y: false}
    yield put({type: TYPES.SHOW_INPUT_ERROR, err});

  } catch (e) {
    let data = false
    yield put({type: TYPES.HIDE_RESULTS_COMP, data});
    let err = {f: false, l: false, y: true}
    yield put({type: TYPES.SHOW_INPUT_ERROR, err});
    //console.log('Please check the year')
  }
}

//{ method: 'GET', headers}
