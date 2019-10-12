import React, { useState } from 'react';
import ReactMapGl, { Marker, Popup, NavigationControl } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMountain } from '@fortawesome/free-solid-svg-icons'
import commaNumber from 'comma-number'
import peaks from './peaks'

const mapboxApiToken = 'pk.eyJ1IjoiY29sb3JhZHVkZSIsImEiOiJjaWY2NnN5MjAwYjVxc21rdTdzdWQwd2NtIn0.4_IhtN06SX3K3moZ1da-cg'

const MapCanvas = ({ 
  setPeakInfo,
  setTrailheadInfo, 
  setRouteInfo
}) => {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 39.191984,
    longitude: -105.535192,
    zoom: 6.2
  })

  const [popupInfo, setPopupInfo] = useState(null)

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={mapboxApiToken}
      onViewportChange={viewport => setViewport(viewport)}
    >
      <div className='navigation-control'>
        <NavigationControl />
      </div>
      {peaks.map((peak) => {
        return (
          <Marker
            latitude={Number(peak.latitude)}
            longitude={Number(peak.longitude)}
            
          >
            <FontAwesomeIcon 
            onMouseEnter={() => setPopupInfo(peak)}
            icon={faMountain}/>
          </Marker>
        )
      })}
      {popupInfo && <Popup
        className='peak-popup'
        anchor='top'
        latitude={Number(popupInfo.latitude)}
        longitude={Number(popupInfo.longitude)}
        onClose={() => setPopupInfo(null)}
        closeOnClick={false}
        captureClick={true}
        >
          <div
            onMouseLeave={() => setPopupInfo(null)}
            onClick={() => {
              setPeakInfo(popupInfo)
              fetch(`http://localhost:8000/peaks/${popupInfo.pkKey}`)
                .then(res => res.json())
                .then(({peakTrailheads, peakRoutes}) => {
                  setTrailheadInfo(peakTrailheads)
                  setRouteInfo(peakRoutes)
                })

            }}
          >
            <h3>{`${popupInfo.name} • ${commaNumber(popupInfo.elevation)}'`}</h3>
            <img className='peak-thumbnail' src={popupInfo.thumbnail}/>
          </div>
        </Popup>}
    </ReactMapGl>
  )
}

export default MapCanvas