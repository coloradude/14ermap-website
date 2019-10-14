import React , { useState, useEffect } from 'react'
import commaNumber from 'comma-number'
import peakList from './peaks'

const RouteView = ({routeId}) => {

  const [route, setRoute] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8000/routes/${routeId}`)
      .then(res => res.json())
      .then(setRoute)
  }, [routeId])

  return (
    <div className='side-bar'>
      <div className='route-container'><h1>14erMap.com</h1></div>
      <div className='route-container'>
        <img className='sidebar-thumbnail' src='https://cdn2.vectorstock.com/i/1000x1000/85/51/mountain-climbing-route-to-peak-business-progress-vector-22378551.jpg'/>
        <h3>{`${route.name}`}</h3>
        <span>{`Distance: ${route.distance} miles`}</span>
        <span>{`Gain: ${commaNumber(route.gain)}'`}</span>
        <span>{`Difficulty: ${route.difficulty}`}</span>
        <span>{`Exposure: ${route.exposure}`}</span>
        <span>{`Forest: ${route.forest}`}</span>
        {route.wilderness ? <span>{`Wilderness: ${route.wilderness}`}</span> : ''}
        <span>{`Description: ${route.text}`}</span>
        <span>{`Notes: ${route.notes}`}</span>
      </div>
    </div>
  )
}

export default RouteView