import React from 'react'
import PeakView from './PeakView'
import MapCanvas from './Map.js'
import './App.css';
import { Router } from '@reach/router'



const App = ({sideBar, getters, setters}) => {

  const Home = () => {
    return <div className='side-bar'><h1>14erMap.com</h1></div>
  }

  return (
    <div className="App">
      <Router >
        <Home path='/' />
        <PeakView path='peak/:pkKey' />
      </Router>
      <MapCanvas />
    </div>
  )
}

export default App
