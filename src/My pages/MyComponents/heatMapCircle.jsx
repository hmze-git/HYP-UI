import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet"
import "leaflet.heat"



const HeatMapCirc=({points})=>{

    const m= useMap()

    useEffect(()=>{
        if (!points || points.length===0) return


        const heatL= L.heatLayer(points,{
            radius:50,
            blur:15,
            max:20,
        }).addTo(m)

        return()=>{
            m.removeLayer(heatL)
        }


    },[m,points])

    return null
}

export default HeatMapCirc