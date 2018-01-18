import { connect } from 'react-redux'
import App from '../components/App'
import { fetchPlayerStatsRequest, fetchPlayerIDRequest, fetchPlayerNameYear, hideResult, hideResultComp, showInputError } from '../actions'

const mapStateToProps = ({playerInfo}) => ({playerInfo})

const bindActionsToDispatch = dispatch => (
    {
        fetchPlayerIDRequest: (fname, lname, year) => dispatch(fetchPlayerIDRequest(fname, lname, year)),
        fetchPlayerStatsRequest: (player_id, year) => dispatch(fetchPlayerStatsRequest(player_id, year)),
        fetchPlayerNameYear: (player_name, year) => dispatch(fetchPlayerNameYear(player_name, year)),
        hideResult: (data) => dispatch(hideResult(data)),
        hideResultComp: (data) => dispatch(hideResultComp(data)),
        showInputError: (data) => dispatch(showInputError(data))
    }
)

const AppContainer = connect(mapStateToProps, bindActionsToDispatch)(App)

export default AppContainer
