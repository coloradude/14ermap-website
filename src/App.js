import React, { useState } from 'react';
import logo from './logo.svg';
// import ReactMapboxGl, { Layer, Feature , GeoJSONLayer} from 'react-mapbox-gl';
// import geoJSON from './GeoJSON'
// import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import ReactMapGl, { NavigationControl, Marker, Popup } from 'react-map-gl'
import peaks from './peaks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMountain } from '@fortawesome/free-solid-svg-icons'
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



const App = () => {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 39.191984,
    longitude: -105.535192,
    zoom: 6.2
  })

  const [popupInfo, setPopupInfo] = useState(null)

  return (
    <div className="App">
      <div className="sideBar">
        <h1>14erMap.com</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
      <div className='mapArea'>
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={mapboxApiToken}
          onViewportChange={viewport => setViewport(viewport)}
          // onClick={() => setPopupInfo(null)}
        >
          <div style={{position: 'absolute', left: 10, top: 10}}>
            <NavigationControl />
          </div>
          {peaks.map(({latitude, longitude, name, thumbnail}) => {
            return (
              <Marker
                latitude={Number(latitude)}
                longitude={Number(longitude)}
                
              >
                <FontAwesomeIcon 
                onMouseEnter={() => setPopupInfo({latitude, longitude, name, thumbnail})}
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
                onClick={(e) => {
                  
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
