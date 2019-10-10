import React, { useState } from 'react';
import logo from './logo.svg';
// import ReactMapboxGl, { Layer, Feature , GeoJSONLayer} from 'react-mapbox-gl';
import geoJSON from './GeoJSON'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './App.css';

// const Map = ReactMapboxGl({
//   accessToken:
//     'pk.eyJ1IjoiY29sb3JhZHVkZSIsImEiOiJjaWY2NnN5MjAwYjVxc21rdTdzdWQwd2NtIn0.4_IhtN06SX3K3moZ1da-cg'
// });


const App = () => {
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
      <Map
        attribution='© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        center={[39.191984, -105.535192]}
        zoom={7}
        
      >
        <TileLayer
          tileSize={512}
          zoomOffset={-1}
          url='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29sb3JhZHVkZSIsImEiOiJjaWY2NnN5MjAwYjVxc21rdTdzdWQwd2NtIn0.4_IhtN06SX3K3moZ1da-cg'
        />
      </Map>
        {/* <Map
          
          // containerStyle={{
          //   height: '100%',
          //   width: '100%'
          // }}
          // center={[-105.535192, 39.191984]}
          // zoom={[6]}
        >
          <MapboxGlLayer 
            style="mapbox://styles/mapbox/streets-v9"
            accessToken='pk.eyJ1IjoiY29sb3JhZHVkZSIsImEiOiJjaWY2NnN5MjAwYjVxc21rdTdzdWQwd2NtIn0.4_IhtN06SX3K3moZ1da-cg'
          />
          {/* <GeoJSONLayer
            data={geoJSON}
          /> */}

          {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'mountain-15' }}>
            <Feature 
              coordinates={[-105.535192, 39.191984]} 
              geometry={{properties: {type: 'point'}}}
            />
          </Layer> */}
          {/* <Marker position={[-105.535192, 39.191984]}>M</Marker> */}
       
      </div>
    </div>
  );
}

export default App;
