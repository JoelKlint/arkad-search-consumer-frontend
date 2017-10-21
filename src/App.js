import React, { Component } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion'
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import moment from 'moment'
import './App.css';

const MESSAGE = 'I AM A MESSAGE'

let queryStart = undefined

const DefaultMessages = {
  NoHitsText: 'No results found, try something else',
  NoQueryText: 'Welcome to Arkad Search! What are you looking for?',
  SearchingText: 'Searching...'
}
const Messages = {
  NoHitsText: document.currentScript.getAttribute('NoHitsText') || DefaultMessages.NoHitsText,
  NoQueryText: document.currentScript.getAttribute('NoQueryText') || DefaultMessages.NoQueryText,
  SearchingText: document.currentScript.getAttribute('SearchingText') || DefaultMessages.SearchingText
}

const RandomString = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

class App extends Component {

  state = {
    query: '',
    results: [{"id": RandomString(), "type": MESSAGE, "message": Messages.NoQueryText}],
    modal: null
  }

  _queryBackend = () => {
    queryStart = Number(moment().format('x'))
    const ApiUrl = 'https://arkad-search.herokuapp.com'
    fetch(`${ApiUrl}/arkad-search/${this.state.query}`)
    .then(res => res.json())
    .then(res => {
      if(res.length === 0) {
        this.setState({
          results: [{"id": RandomString(), "type": MESSAGE, "message": Messages.NoHitsText}]
        })
      }
      else {
        const timeSpentSearching = Number(moment().format('x')) - queryStart
        setTimeout(
          () => this.setState({results: res}), 
          600 - timeSpentSearching
        )
      }
    })
    .catch(err => console.error(err))
  }

  _search = () => {
    if(this.state.query === '') {
      this.setState({
        results: [{"id": RandomString(), "type": MESSAGE, "message": Messages.NoQueryText}]
      })
    }
    else {
      this.setState({
        results: [{"id": RandomString(), "type": MESSAGE, "message": Messages.SearchingText}]
      })
      setTimeout(this._queryBackend, 600)
    }
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
          onKeyPress={(e) => e.which === 13 ? this._search() : null}
        />
        <button onClick={this._search}>Search</button>
      </div>
    )
  }

  _renderSearchResult = (config) => {
    const {data, style} = config

    const shouldRenderDate = () => moment(data.date).year() === moment().year()
    const shouldRenderTime = () => shouldRenderDate() && data.time.substring(0,5) !== '00:00'

    const renderTime = () => data.time.substring(0,5)
    const renderDate = () => moment(data.date).format('D MMM')

    return (
      <div 
        onClick={() => this.setState({modal: data.id})}
        style={style} 
        className='ArkadSearch_Result' 
        key={data.id}
      >
        <div className='ArkadSearch_ResultHeader'>
          <div className='ArkadSearch_ResultTitle'>{data.name}</div>
          <div className='ArkadSearch_ResultTime'>
            {shouldRenderDate() ? renderDate() : ''}<br/>
            {shouldRenderTime() ? renderTime() : ''}
          </div>
        </div>
        <div className='ArkadSearch_ResultInfo'>{data.info}</div>
        <SweetAlert
          show={this.state.modal === data.id}
          animation='slide-from-bottom'
          title={data.name}
          text={data.info}
          onEscapeKey={() => this.setState({modal: null})}
          onOutsideClick={() => this.setState({modal: null})}
          onConfirm={() => this.setState({modal: null})}
        />
      </div>
    )
  }

  _renderMessageEntry = (config) => {
    const {style, key, data} = config
    return (
      <div style={style} className="ArkadSearch_Message" key={key}>
        {data.message}
      </div>
    )
  }

  _getSortedArray = (array) => {
    return array.sort((a, b) => {
      // Both are messages
      if(a.data.type === MESSAGE && b.data.type === MESSAGE) {
        if(a.data.message === Messages.SearchingText) {
          return 1
        }
        else if(b.data.message === Messages.SearchingText) {
          return -1
        }
        else {
          return 0
        }
      }
      // Only a is message
      else if(a.data.type === MESSAGE) {
        return 1
      }
      // Only b is message
      else if(b.data.type === MESSAGE) {
        return -1
      }
      // None is message
      else {
        return 0
      }
    })
  }

  _getStyles = () => {
    return this.state.results.map(result => ({
      key: String(result.id),
      style: {
        height: spring(125, presets.wobbly), 
        marginTop: spring(10, presets.wobbly),
        marginBottom: spring(10, presets.wobbly),
      },
      data: result,
    }))
  }

  _getDefaultStyles = () => {
    return this.state.results.map(result => ({
      key: String(result.id),
      style: {
        height: 0, 
        marginTop: 0,
        marginBottom: 0,
      }
    }))
  }

  _willLeave = () => {
    return {
      height: spring(0, presets.noWobble), 
      marginTop: spring(0, presets.noWobble), 
      marginBottom: spring(0, presets.noWobble),
    }
  }

  _willEnter = () => {
    return {
      height: 0, 
      marginTop: 0,
      marginBottom: 0,
    }
  }

  render() {
    return (
      <div className="ArkadSearch_Container">

        {this._renderInputField()}

        <TransitionMotion
          styles={this._getStyles()}
          defaultStyles={this._getDefaultStyles()}   
          willLeave={this._willLeave}
          willEnter={this._willEnter}
        >
          {styles => 
            <div>
              {this._getSortedArray(styles).map(config => (
                config.data.type === MESSAGE
                ? this._renderMessageEntry(config)
                : this._renderSearchResult(config))
              )
              }
            </div>
          }
        </TransitionMotion>

      </div>
    );
  }
}

export default App;
