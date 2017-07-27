import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ghViewer from './reducers'
import AppContainer from './containers/AppContainer'
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

let extMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(ghViewer,
    compose(applyMiddleware(sagaMiddleware), persistState(), extMiddleware || (a => a))
)
sagaMiddleware.run(mySaga)

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
)