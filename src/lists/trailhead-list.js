import React from 'react'

export const TrailheadList = ({trailheads}) => {
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

export const RouteList = ({routes}) => {
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
