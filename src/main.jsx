import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MoodProvider } from './context/MoodContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MoodProvider>
      <App />
    </MoodProvider>
  </React.StrictMode>,
)
