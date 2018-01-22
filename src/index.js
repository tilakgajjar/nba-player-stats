import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import { store } from './store/index.js'
import App from './container'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={App} />
      </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
