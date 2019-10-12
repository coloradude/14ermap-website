import React from 'react'

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

export default TrailheadList