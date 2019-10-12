import React, { useState } from 'react';
import logo from './logo.svg';
// import ReactMapboxGl, { Layer, Feature , GeoJSONLayer} from 'react-mapbox-gl';
// import geoJSON from './GeoJSON'
// import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import ReactMapGl, { NavigationControl, Marker, Popup } from 'react-map-gl'
import peaks from './peaks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMountain } from '@fortawesome/free-solid-svg-icons'
import commaNumber from 'comma-number'
import './App.css';

const mapboxApiToken = 'pk.eyJ1IjoiY29sb3JhZHVkZSIsImEiOiJjaWY2NnN5MjAwYjVxc21rdTdzdWQwd2NtIn0.4_IhtN06SX3K3moZ1da-cg'

// const mapStyle = {
//   version: 8,
//   sources: geoJSON,
//   layers: [
//         {
//             id: 'my-layer',
//             type: 'circle',
//             source: 'points',
//             paint: {
//                 'circle-color': '#f00',
//                 'circle-radius': 4
//             }
//         }
//     ]
// }

// console.log(geoJSON)

// const Map = ReactMapboxGl({
//   accessToken:
//     'pk.eyJ1IjoiY29sb3JhZHVkZSIsImEiOiJjaWY2NnN5MjAwYjVxc21rdTdzdWQwd2NtIn0.4_IhtN06SX3K3moZ1da-cg'
// });

fetch('http://reddit.com/r/all/.json').then(res => res.json()).then(res => console.log(res))

const App = () => {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 39.191984,
    longitude: -105.535192,
    zoom: 6.2
  })

  const [popupInfo, setPopupInfo] = useState(null)

  const [activePeakInfo, setActivePeakInfo] = useState(null)


  return (
    <div className="App">
      <div className="sideBar">
        <h1>14erMap.com</h1>
        {activePeakInfo && 
        <div>
          <h3>{`${activePeakInfo.peak.name} • ${commaNumber(activePeakInfo.peak.elevation)}`}</h3>
          <p>{activePeakInfo.peak.location}</p>
          <div className='route-container'>
            <span><h4>Routes</h4></span>
            {activePeakInfo.peakRoutes &&
              activePeakInfo.peakRoutes.map(route => {
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
          <div className='route-container'>
            <span><h4>Trailheads</h4></span>
            {activePeakInfo.peakTrailheads &&
              activePeakInfo.peakTrailheads.map(trailhead => {
                return (
                <button 
                  className='route-button'
                >
                  {`${trailhead.name}`}
                </button>
                )
              })
            }
          </div>
        </div>
        }
      </div>
      <div className='mapArea'>
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
                  setActivePeakInfo({peak: popupInfo, trailheads: null, routes: null})
                  fetch(`http://localhost:8000/peaks/${popupInfo.pkKey}`)
                    .then(res => res.json())
                    .then(res => setActivePeakInfo({...res, peak: popupInfo}))
                  
                  console.log('click')
                }}
              >
                <h3>{popupInfo.name}</h3>
                <img className='peak-thumbnail' src={popupInfo.thumbnail}/>
              </div>
            </Popup>}
        </ReactMapGl>     
      </div>
    </div>
  );
}

export default App;
