import React from 'react';
import style from './Css/Countries.module.css';

export function Countries({name, img, continente}){
    return(
        <div className={style.cts} >
            <h3 className={style.h3} >{name}</h3>
            <img className={style.img}  src={img} alt='imageCountry' width='250px' height='125px' />
            <h4 className={style.h4} >{continente}</h4>
        </div>
    )
};

export default Countries;