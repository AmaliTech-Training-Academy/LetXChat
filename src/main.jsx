import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import {store} from './app/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
