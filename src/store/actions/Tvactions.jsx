import React from 'react'
import axios from '../../utils/Axios'
import { loadtv } from '../reducers/Tvslice'


export const asyncloadtv =  (id)=> async(dispatch ,getstate)=>{
    try {
        const details = await axios.get(`/tv/${id}`)
        const images = await axios.get(`/tv/${id}/images`)
        const extrenalid = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const credits = await axios.get(`/tv/${id}/credits`)
        const watchprovider = await axios.get(`/tv/${id}/watch/providers`)



        const ultimatedetails = {
            details: details.data,
            images : images.data,
            extrenalid: extrenalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m)=>m.type = 'Trailer') || videos.data.results.find((m)=>m.name = 'Final Trailer' || "Official Trailer"),
            credits : credits.data.cast,
            watchprovider: watchprovider.data.results.US || watchprovider.data.results.IN,
        }
        
        dispatch(loadtv(ultimatedetails));
        
        // console.log(ultimatedetails);
        
        
    } catch (error) {
        console.log(error)
    }
}