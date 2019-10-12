import React, { useState } from 'react';
import { TrailheadList, RouteList } from './lists/trailhead-list'
import MapCanvas from './Map.js'
import commaNumber from 'comma-number'
import './App.css';


const App = () => {

  const [peakInfo, setPeakInfo] = useState(null)
  const [trailheadInfo, setTrailheadInfo] = useState(null)
  const [routeInfo, setRouteInfo] = useState(null)

  return (
    <div className="App">
      <div className="sideBar">
        <h1>14erMap.com</h1>
        {/* {peakInfo &&  */}
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
          
        <RouteList routes={routeInfo}/>
        <TrailheadList trailheads={trailheadInfo}/>

      </div>
      <div className='mapArea'>
        <MapCanvas 
          setPeakInfo={setPeakInfo}
          setRouteInfo={setRouteInfo}
          setTrailheadInfo={setTrailheadInfo}
        />
        {/* <ReactMapGl
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
        </ReactMapGl> */}
      </div>
    </div>
  );
}

export default App;
