import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    query: 'QUERY',
    results: []
  }

  componentDidMount() {
    // this._setFakeDataInState()
  }

  _setFakeDataInState = () => {
    this.setState({
      results: [
        {
            "name": "ARKAD Fair",
            "time": "10:00:00",
            "date": "2017-11-15T00:00:00.000Z",
            "info": "Arbetsmässa på LTH som är grym",
            "id": 1
        },
        {
            "name": "Title",
            "time": "12:00:00",
            "date": "2017-11-12T00:00:00.000Z",
            "info": "This is a Title",
            "id": 10
        }
      ]
    })
  }

  _queryBackend = () => {
    // fetch(`http://search.arkadtlth.se/arkad-search/${this.state.query}`)
    // .then(res => res.json)
    // .then(res => console.log(res))
    setTimeout(this._setFakeDataInState, 1000)
  }

  _renderInputField = () => {
    return (
      <div className='ArkadSearch_InputField'>
        <input 
          type="text"
          placeholder='Search...'
          value={this.state.query}
          onChange={event => this.setState({query: event.target.value})}
        />
        <button onClick={this._queryBackend}>Search</button>
      </div>
    )
  }

  _renderSearchResult = (result) => {
    return (
      <div className='ArkadSearch_Result' key={result.id}>
        <div className='ArkadSearch_ResultHeader'>
          <div className='ArkadSearch_ResultTitle'>{result.name}</div>
          <div className='ArkadSearch_ResultTime'>{result.time}</div>
        </div>
        <div>{result.info}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="ArkadSearch_Container">

        {this._renderInputField()}

        {this.state.results.map(result => this._renderSearchResult(result))}

      </div>
    );
  }
}

export default App;
