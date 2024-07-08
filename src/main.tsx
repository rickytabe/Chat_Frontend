import React from 'react'
import ReactDOM from 'react-dom/client'
import Chat from './chat.tsx'
import './chat.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>,
)
