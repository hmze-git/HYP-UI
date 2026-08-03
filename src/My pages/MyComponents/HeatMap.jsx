import React from "react";
import { MapContainer,TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HeatMapCirc from "./heatMapCircle";

//Use the final number (intensity to specify how much something should contribute 1.0 for minor accidents 5.0 moderate 10.0 major)

//https://www.youtube.com/watch?v=jD6813wGdBA use this video link to go through the icon placement section later on


const HeatMap =({HeatPoints,CenterCords})=>{


return(


<>

    <MapContainer center={CenterCords}zoom={14}
    
        style={{height:"100%",width:"100%"}}
    >

        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"


        />

    <HeatMapCirc  points={HeatPoints}/>

    </MapContainer>

</>

)

}
export default HeatMap