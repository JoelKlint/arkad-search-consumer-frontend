import React, { Component } from 'react';
import FlipMove from 'react-flip-move'
import './App.css';

class App extends Component {

  state = {
    query: '',
    results: [],
    hasSearched: false
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
      ],
      hasSearched: true
    })
  }

  _queryBackend = () => {
    // fetch(`http://search.arkadtlth.se/arkad-search/${this.state.query}`)
    // .then(res => res.json)
    // .then(res => console.log(res))
    setTimeout(this._setFakeDataInState, 500)
  }

  _renderInputField = () => {
    return (
      <div className='ArkadSearch_InputField'>
        <input 
          type="text"
          placeholder='Search...'
          value={this.state.query}
          autoFocus
          onChange={event => this.setState({query: event.target.value})}
          onKeyPress={(e) => e.which === 13 ? this._queryBackend() : null}
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

  _renderNoResultsEntry = () => {
    const {hasSearched} = this.state
    if(hasSearched) {
      return (
        <div className="ArkadSearch_NoResultsText" key='NO-HITS'>
          No results found, try something else
        </div>
      )
    }
    else {
      return (
        <div className="ArkadSearch_NoResultsText" key='FIRST-SEARCH'>
          Please enter a search query
        </div>
      )
    }
  }

  render() {
    return (
      <div className="ArkadSearch_Container">

        {this._renderInputField()}

        <FlipMove 
          duration={500} 
          easing="ease-in-out"
          enterAnimation="elevator"
          leaveAnimation="elevator"
        >
          {
            this.state.results.length > 0
            ? this.state.results.map(result => this._renderSearchResult(result))
            : this._renderNoResultsEntry()
          }
        </FlipMove>


      </div>
    );
  }
}

export default App;
