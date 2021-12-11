import axios from 'axios';
import {GET_COUNTRIES, ORDER_BY_NAME, ORDER_BY_CONTINENT,
     GET_COUNTRY_NAME, GET_COUNTRY_DETAIL, ORDER_BY_ACTIVITY, ORDER_ACT} from './types';




export function getCountries(){
    return async function(dispatch){
        const countries = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: GET_COUNTRIES,
            payload: countries.data
        });
    }
};

export function getCountryName(name){
    return async function(dispatch){
        try {
            const result = await axios.get('http://localhost:3001/countries?name='+ name);
            return dispatch({
                type: GET_COUNTRY_NAME,
                payload: result.data
            });
        } catch (error) {
            console.log(error)
        }
    }
};

export function getCountryDetail(id) {
    return async function(dispatch){
        try {
            var result = await axios.get('http://localhost:3001/countries/' + id);
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: result.data
            });
        } catch (error) {
            console.log(error)
        }
    }
};

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
};

export function orderByContinent(payload){
    return {
        type: ORDER_BY_CONTINENT,
        payload
    }
};

export function orderByActivity(payload){
    return{
        type: ORDER_BY_ACTIVITY,
        payload
    }
};

export function getActivities(){
    return async function(dispatch){
        const result = await axios.get('http://localhost:3001/activities');
        return dispatch({
            type: ORDER_ACT,
            payload: result.data
        });
    }
}

export function postActivity(payload) {
    return async function(dispatch){
        const post = await axios.post('http://localhost:3001/activity', payload);
        return post;
    }   
};