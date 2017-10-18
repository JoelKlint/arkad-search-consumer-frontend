import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const mountNode = document.currentScript.mountNode || 'arkad-search-consumer-frontend'


ReactDOM.render(<App />, document.getElementById(mountNode));
registerServiceWorker();
