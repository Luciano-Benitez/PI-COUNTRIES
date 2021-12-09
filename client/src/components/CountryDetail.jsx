import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {getCountryDetail} from '../actions/index';
import {ActivityCard} from './ActivityCard';
import style from './Css/Detail.module.css'

export function CountryDetail(props){
    const {id} = props.match.params;
    const detail = useSelector(state => state.detail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetail(id))
    },[dispatch,id]);

    return(
        <div >
        <Link to={'/home'}><button className={style.button} >Volver</button></Link>

        {
            detail ?
            <div className={style.app} >
                <h1>{detail.name}</h1>
                <img float='right' src={detail.img} width='450px' height='225px' alt='img'/>
                <h3 className={style.h3} for='id' >ID:<h4 name='id' >{detail.id}</h4></h3>
                <h3 for='continent' >Continente:<h4 name='contienent' >{detail.continente}</h4></h3>
                <h3 for='capital' >Capital:<h4 name='capital' >{detail.capital}</h4></h3>
                <h3 for='subregion' >Subregion:<h4 name='subregion' >{detail.subregion}</h4></h3>
                <h3 for='area' >Área:<h4 name='area' >{detail.area}</h4></h3>
                <h3 for='poblacion' >Población:<h4 name='poblacion' >{detail.poblacion}</h4></h3>
                {detail.activities && detail.activities.map((activity) =>
                <ActivityCard
                name={activity.name}
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season} />)}

            </div> : <p>loading...</p>
        }
        </div>
    )
};

export default CountryDetail;