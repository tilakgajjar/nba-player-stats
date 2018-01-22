import React, { Component } from 'react';
import { Form, Input, Button, Modal, Header, Dropdown, Label, Popup, Divider, Icon, Table } from 'semantic-ui-react'
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
    statsValue: [],
    showErrDropdown: false
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

  if(this.state.statsValue.length===0){
    this.setState({ showErrDropdown: true })
  }

  e.preventDefault();
    if(this.props.playerInfo.people.length > 0){
      this.setState({ modalOpen: true })
    }

}

onDropDownChange = (event, data) => {
    this.setState({ showErrDropdown: false })
    this.setState({ statsValue: data.value })
}


  render() {
    const { fname, lname, year, playerName, playerId, multiplePlayers, statsValue, showErrDropdown } = this.state
    const { fetchPlayerIDRequest, playerInfo, fetchPlayerStatsRequest, fetchPlayerNameYear } = this.props
    const options = [
      { key: 'PPG', text: 'PPG', value: 'PPG' },
      { key: 'APG', text: 'APG', value: 'APG' },
      { key: 'RPG', text: 'RPG', value: 'RPG' },
      { key: 'FG%', text: 'FG%', value: 'FG%' },
      { key: '3P%', text: '3P%', value: '3P%'}
    ]

    let ppg, apg, rpg, fgp, fg3p = null
      if(statsValue.find(k => k==='PPG')){ppg =  playerInfo.stats.map((stat, i) => <Table.Row key={i}><Table.Cell>PPG:  {stat.ppg.toFixed(2)}</Table.Cell></Table.Row>) }
      if(statsValue.find(k => k==='APG')){apg =  playerInfo.stats.map((stat, i) => <Table.Row key={i}><Table.Cell>APG:  {stat.apg.toFixed(2)}</Table.Cell></Table.Row>) }
      if(statsValue.find(k => k==='RPG')){rpg =  playerInfo.stats.map((stat, i) => <Table.Row key={i}><Table.Cell>RPG:  {stat.rpg.toFixed(2)}</Table.Cell></Table.Row>) }
      if(statsValue.find(k => k==='FG%')){fgp =  playerInfo.stats.map((stat, i) => <Table.Row key={i}><Table.Cell>FG%:  {stat.fgp.toFixed(2)}</Table.Cell></Table.Row>) }
      if(statsValue.find(k => k==='3P%')){fg3p =  playerInfo.stats.map((stat, i) => <Table.Row key={i}><Table.Cell>3P%:  {stat.fg3p.toFixed(2)}</Table.Cell></Table.Row>)}

    let results = null
    if(playerInfo.stats.length===1 && playerInfo.isShowResultsComp && !showErrDropdown){
      results=   <div style={{marginTop: '10px'}}>
                  <Table inverted>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>{playerInfo.player.name + ' - ' + playerInfo.player.year}</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {ppg}
                      {apg}
                      {rpg}
                      {fgp}
                      {fg3p}
                    </Table.Body>
                </Table>
              </div>
                  //<div><h3>{playerInfo.player.name + ' ' + playerInfo.player.year}</h3>
                  //{ppg}{apg}{rpg}{fgp}{fg3p}
              //  </div>
    }

    //console.log(playerInfo);
    const show = false
    let playerLable = null
    if(playerInfo.people.length > 1){
      playerLable = <Modal size='mini' open={playerInfo.isShow} onClose={this.handleClose}>
                      <Modal.Header>Select a Player</Modal.Header>
                      <Modal.Content align='center'>
                          {playerInfo.people.map((person, i) => <div style={{marginBottom: '.5em'}}><Button fluid color='green' onClick={(event) => {this.handleClose(show); this.onPlayerClick(person.id, person.player_name);}} key={i}>{person.player_name}</Button></div>)}
                      </Modal.Content>
                    </Modal>
    }

    let firstNameInput = null
    let lastNameInput =  null
    let yearInput = null
    let icon = <Icon color='white' basic="true" />

    if(playerInfo.err.yearInputErr){
      yearInput =  <Form.Field>
                      <Label size='mini' color='red' pointing='below'>Invalid Year</Label>
                      <Input fluid size='small' type="number" name="year"  value={this.state.year} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}   placeholder='Year' />
                   </Form.Field>

    } else {
      yearInput = <Form.Field>
                      <Label size='mini' pointing='below' color='basic' style={{  color: 'white', border: '0px' }}> ABCD </Label>
                      <Input fluid size='small' type="number" name="year" value={this.state.year} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}  placeholder='Year' />
                  </Form.Field>

    }

    if(playerInfo.err.firstNameInputErr){
      firstNameInput =  <Form.Field>
                          <Label size='mini' color='red' pointing='below'>Invalid First Name or Last Name</Label>
                          <Input  fluid size='small' type="text"  name="fname" value={this.state.fname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }} placeholder='First Name' />
                        </Form.Field>
    } else {
      firstNameInput =  <Form.Field>
                          <Label size='mini' pointing='below' color='basic' style={{ color: 'white', border: '0px' }}> ABCD </Label>
                          <Input fluid size='small' type="text"  name="fname" value={this.state.fname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }} placeholder='First Name' />
                        </Form.Field>
    }


    if(playerInfo.err.lastNameInputErr){
      lastNameInput =  <Form.Field>
                         <Label size='mini' color='red' pointing='below'>Invalid First Name or Last Name</Label>
                         <Input fluid size='small' type="text" name="lname" value={this.state.lname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}  placeholder='Last Name' />
                       </Form.Field>
    } else {
      lastNameInput =  <Form.Field>
                        <Label size='mini' pointing='below' color='basic' style={{ color: 'white', border: '0px' }}> ABCD </Label>
                        <Input fluid size='small' type="text" name="lname" value={this.state.lname} onChange={this.onChange.bind(this)} style={{ marginBottom: '1em' }}  placeholder='Last Name' />
                      </Form.Field>
    }

    let statsDropdown = null

    if(showErrDropdown){
      statsDropdown = <Form.Field>
                         <Label size='mini' color='red' pointing='below'>Must select stats</Label>
                         <Dropdown placeholder='Choose Stats' onChange={this.onDropDownChange} fluid multiple selection options={options} />
                      </Form.Field>
    }else {
      statsDropdown = <Form.Field>
                         <Label size='mini' pointing='below' color='basic' style={{ color: 'white', border: '0px' }}>ABCD</Label>
                         <Dropdown placeholder='Choose Stats' onChange={this.onDropDownChange} fluid multiple selection options={options} />
                      </Form.Field>
    }

    return (
      <div className="App" align='center'>
          <img src={logo} className="App-logo" alt="logo" />
          <Form onSubmit={this.onSubmit} >
            <div>
              {firstNameInput}
              {lastNameInput}
              {yearInput}
              {statsDropdown}
              <div style={{marginBottom: '5px', marginTop: '5px'}}><Button primary fluid type="submit" onClick={(event) => {fetchPlayerIDRequest(fname, lname, year)}}>Submit</Button></div>
            </div>
            <div>
              {playerLable}
            </div>
            <div className='App-results'>
                <div>{results}</div>
            </div>
          </Form>
      </div>
    );
  }
}

export default App;
