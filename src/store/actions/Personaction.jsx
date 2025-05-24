import React from 'react'
import axios from '../../utils/Axios'
import { loadperson } from '../reducers/Personslice'


export const asyncloadperson =  (id)=> async(dispatch ,getstate)=>{
    try {
        const details = await axios.get(`/person/${id}`)
        const images = await axios.get(`/person/${id}/images`)
        const extrenalid = await axios.get(`/person/${id}/external_ids`)
        const combinedcredits = await axios.get(`/person/${id}/combined_credits`)
        const tvcredits = await axios.get(`/person/${id}/movie_credits`)
        const moviecredits = await axios.get(`/person/${id}/tv_credits`)
        



        const ultimatedetails = {
            details: details.data,
            images : images.data,
            extrenalid: extrenalid.data,
            combinedcredits : combinedcredits.data,
            moviecredits : moviecredits.data,
            tvcredits : tvcredits.data
        }
        
        
        dispatch(loadperson(ultimatedetails));
        
        
        
    } catch (error) {
        console.log(error)
    }
}