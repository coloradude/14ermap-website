import React , { useState, useEffect } from 'react'
import commaNumber from 'comma-number'
import peakList from './peaks'

const TrailheadList = ({trailheads}) => {
  return (
    <div className='route-container'>
      <span><h4>Trailheads</h4></span>
      {trailheads && 
      trailheads.map(trailhead => {
          return (
            <button 
              className='route-button'
            >
              {`${trailhead.name}`}
            </button>
          )
        })}
    </div>
  )
}

const RouteList = ({routes}) => {
  return (
    <div className='route-container'>
      <span><h4>Routes</h4></span>
      {routes &&
      routes.map(route => {
        return (
          <button
            className='route-button'
          >
            {`${route.name} • ${route.difficulty}`}
          </button>
        )
      })
      }

    </div>
  )
}

const PeakInfo = peakInfo => {
  return ([
    <h1>14erMap.com</h1>,
    <div className='peak-container'>
      {peakInfo && [
          <img 
            src={peakInfo.thumbnail}
            className='sidebar-thumbnail'
          />,
          <h3>{`${peakInfo.name} • ${commaNumber(peakInfo.elevation)}'`}</h3>,
          <p>{peakInfo.location}</p>
        ]}
    </div>
  ])
}


const PeakView = ({pkKey}) => {

  const [peakInfo, setPeakInfo] = useState(peakList.find(peak => peak.pkKey === pkKey))
  const [trailheadInfo, setTrailheadInfo] = useState([])
  const [routeInfo, setRouteInfo] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/peaks/${pkKey}`)
      .then(res => res.json())
      .then(({peakRoutes, peakTrailheads}) => {
        setRouteInfo(peakRoutes)
        setTrailheadInfo(peakTrailheads)
        setPeakInfo(peakList.find(peak => peak.pkKey === pkKey))
      })
  }, [pkKey])



  return (
    <div className='side-bar'>
      <PeakInfo {...peakInfo} />
      <RouteList routes={routeInfo} />
      <TrailheadList trailheads={trailheadInfo}/>
    </div>
  )
}

export default PeakView