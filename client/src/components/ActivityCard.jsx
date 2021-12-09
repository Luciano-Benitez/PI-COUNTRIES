import React from 'react';
import style from './Css/ActivityCard.module.css';

export function ActivityCard({name,difficulty,duration,season}){
    return(
        

        <div>
         <h3>Actividad: <h4>{name}</h4></h3>
         <h3>Dificultad: <h4>{difficulty}</h4></h3>
         <h3>Duracion: <h4>{duration}</h4></h3>
         <h3>Temporada: <h4>{season}</h4></h3>
         </div>
        
        
    )
};

export default ActivityCard;