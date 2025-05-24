import React from 'react'
import axios from '../../utils/Axios'
import { loadmovie } from '../reducers/Movieslice'

export const asyncloadmovie =  (id)=> async(dispatch ,getstate)=>{
    try {
        const details = await axios.get(`/movie/${id}`)
        const images = await axios.get(`/movie/${id}/images`)
        const extrenalid = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const credits = await axios.get(`/movie/${id}/credits`)
        const watchprovider = await axios.get(`/movie/${id}/watch/providers`)



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
        
        dispatch(loadmovie(ultimatedetails));
        
        // console.log(ultimatedetails);
        
        
    } catch (error) {
        console.log(error)
    }
}