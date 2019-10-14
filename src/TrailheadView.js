import React , { useState, useEffect } from 'react'
import commaNumber from 'comma-number'
import peakList from './peaks'
import { Link } from '@reach/router'


const TrailheadView = ({trailheadId}) => {

  const [trailhead, setTrailhead] = useState({})
  const [peaks, setPeaks] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/trailheads/${trailheadId}`)
      .then(res => res.json())
      .then(res => {
        setTrailhead(res.trailhead)
        setPeaks(res.peaks)
      })
  }, [trailheadId])

  return (
    <div className='side-bar'>
      <div className='route-container'><h1>14erMap.com</h1></div>
      <div className='route-container'>
        <img className='sidebar-thumbnail' src='https://cdn-files.apstatic.com/hike/7051043_medium_1555691971.jpg'/>
        <h3>{`${trailhead.name}`}</h3>
        <span>{`Directions: ${trailhead.directions}`}</span>
        <span>{`Road Information: ${trailhead.roadInfo}`}</span>
        <span>{`Winter Access: ${trailhead.winterAccess}`}</span>
        <h3>Peaks</h3>
        {peaks && peaks.map(peak => {
          return (
            <Link to={`/peak/${peak.pkKey}`}
              className='route-button'
            >
              <button>{`${peak.name}`}</button>
            </Link>
          )
        })}

      </div>
    </div>
  )
}

export default TrailheadView