import React from 'react';
import {Link} from 'react-router-dom';
import style from './Css/Presentacion.module.css';

export function Presentacion(){
    return(
        <div  >
            <div   >
            <Link exact to={'/home'} ><h1>Henry Countries</h1></Link>
            </div>
        </div>
    );
};

export default Presentacion;    