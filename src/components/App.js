import React, { Component } from 'react';
import { Form, Input, Button, Modal, Header, Dropdown, Label, Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import logo from '../logo.jpg';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    fname: '',
    lname: '',
    year: '',
    statsValue: []
  };
}

handleOpen = () => this.setState({ modalOpen: true })

handleClose = (show) => this.props.hideResult(show)

onPlayerClick = (player_id, player_name) => {
  let data = { id: player_id, year: this.state.year, name: player_name}
  this.props.fetchPlayerStatsRequest(data)
}

onChange = (e) => {
  const state = this.state
  state[e.target.name] = e.target.value;
  this.setState(state);
}

onSubmit = (e) => {
  e.preventDefault();
    if(this.props.playerInfo.people.length > 0){
      this.setState({ modalOpen: true })
    }
}

onDropDownChange = (event, data) => {
    this.setState({ statsValue: data.value })
}


  render() {
    const { fname, lname, year, playerName, playerId, multiplePlayers, statsValue } = this.state
    const { fetchPlayerIDRequest, playerInfo, fetchPlayerStatsRequest, fetchPlayerNameYear } = this.props
    const options = [
      { key: 'PPG', text: 'PPG', value: 'PPG' },
      { key: 'APG', text: 'APG', value: 'APG' },
      { key: 'RPG', text: 'RPG', value: 'RPG' },
      { key: 'FG%', text: 'FG%', value: 'FG%' },
      { key: '3P%', text: '3P%', value: '3P%'}
    ]

    let ppg, apg, rpg, fgp, fg3p = null
      if(statsValue.find(k => k==='PPG')){ppg =  playerInfo.stats.map((stat, i) => <h5 key={i}>PPG: {stat.ppg.toFixed(2)}</h5>) }
      if(statsValue.find(k => k==='APG')){apg =  playerInfo.stats.map((stat, i) => <h5 key={i}>APG: {stat.apg.toFixed(2)}</h5>) }
      if(statsValue.find(k => k==='RPG')){rpg =  playerInfo.stats.map((stat, i) => <h5 key={i}>RPG: {stat.rpg.toFixed(2)}</h5>) }
      if(statsValue.find(k => k==='FG%')){fgp =  playerInfo.stats.map((stat, i) => <h5 key={i}>FG%: {stat.fgp.toFixed(2)}</h5>) }
      if(statsValue.find(k => k==='3P%')){fg3p =  playerInfo.stats.map((stat, i) => <h5 key={i}>3P%: {stat.fg3p.toFixed(2)}</h5>)}

    let results = null
    if(playerInfo.stats.length===1 && playerInfo.isShowResultsComp){
      results=  <div style={{marginTop: '10px'}}>
                  <div><h3>{playerInfo.player.name + ' ' + playerInfo.player.year}</h3></div>
                  {ppg}{apg}{rpg}{fgp}{fg3p}
                </div>
    }

    //console.log(playerInfo);
    const show = false
    let playerLable = null
    if(playerInfo.people.length > 1){
      playerLable =  <Modal open={playerInfo.isShow} onClose={this.handleClose} basic>
                      <Header content='Player Info' />
                      <Modal.Content>
                          {playerInfo.people.map((person, i) => <Button color='green' onClick={(event) => {this.handleClose(show); this.onPlayerClick(person.id, person.player_name);}} key={i}>{person.player_name}</Button>)}
                      </Modal.Content>
                    </Modal>
    }

    let firstNameInput = null
    let lastNameInput =  null
    let yearInput = null

    if(playerInfo.err.yearInputErr){
      yearInput =  <Input error fluid size='small' type="number" name="year" value={this.state.year} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}  placeholder='Year is not valid!' />

    } else {
      yearInput = <Input fluid size='small' type="number" name="year" value={this.state.year} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}  placeholder='Year' />
    }

    if(playerInfo.err.firstNameInputErr){
      firstNameInput = <Input error fluid size='small' type="text"  name="fname" value={this.state.fname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }} placeholder='First name is not valid' />

    } else {
      firstNameInput = <Input fluid size='small' type="text"  name="fname" value={this.state.fname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }} placeholder='First Name' />
    }


    if(playerInfo.err.lastNameInputErr){
      lastNameInput = <Input error fluid size='small' type="text" name="lname" value={this.state.lname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}  placeholder='Last name is not valid' />

    } else {
      lastNameInput = <Input fluid size='small' type="text" name="lname" value={this.state.lname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}  placeholder='Last Name' />
    }



    return (
      <div className="App" align='center'>
          <img src={logo} className="App-logo" alt="logo" />
          <Form onSubmit={this.onSubmit}>
            <div>
              <div>{firstNameInput}</div>
              <div>{lastNameInput}</div>
              <div>{yearInput}</div>
              <div><Dropdown placeholder='Choose Stats' onChange={this.onDropDownChange} fluid multiple selection options={options} /></div>
              <div style={{marginBottom: '10px', marginTop: '10px'}}><Button primary fluid type="submit" onClick={(event) => {fetchPlayerIDRequest(fname, lname, year)}}>Submit</Button></div>
            </div>
            <div>
              {playerLable}
            </div>
            <div className='App-results'>
                <h3>Results:</h3>
                <div>{results}</div>
            </div>
          </Form>
      </div>
    );
  }
}

export default App;
