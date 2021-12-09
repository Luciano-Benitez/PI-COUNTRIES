import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {postActivity} from '../actions/index';
import style from './Css/CountryCreate.module.css';

export function CountryCreate(){
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = React.useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '', 
        countries: [],
    });

    console.log('state: ',state)
    
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    function checkDifficulty(e){
        if(e.target.checked){
            setState({
                ...state,
                difficulty: e.target.value
            })
        }
    };

    function checkSeason(e){
        if(e.target.checked){
            setState({
                ...state,
                season: e.target.value
            })
        }
    };


    function handleSubmit(e){
        if(!state.name || !state.difficulty || !state.duration  || !state.season  || !state.countries.length ){
        e.preventDefault();
        alert('¡Debe llenar todos los campos!')
    }else{
        e.preventDefault();
        dispatch(postActivity(state));
        alert('¡La actividad fue creada con exito!');
        setState({name:'', difficulty:'', duration:'', season:'', countries:[]});
        history.push('/home');
    }
    };

    return(
        <div className={style.all} >
            <h2 className={style.h2} >Country Create</h2>
            <Link to={'/home'}> <button className={style.button} >Volver</button></Link>
                
            <form onSubmit={handleSubmit} >
                
                <label className={style.label} >
                    Nombre de la actividad:
                    <input type="text" name="name" value={state.name} onChange={handleChange} />
                    </label>
            
                    <div className={style.label}>
                <p> Dificultad:</p>
                    <p className={style.p}>1 <input type="checkbox"  value={'1'} onChange={checkDifficulty} /></p>
                    <p>2 <input type="checkbox"  value={'2'} onChange={checkDifficulty} /></p>
                    <p>3 <input type="checkbox"  value={'3'} onChange={checkDifficulty} /></p>
                    <p>4 <input type="checkbox"  value={'4'} onChange={checkDifficulty} /></p>
                    <p>5 <input type="checkbox"  value={'5'} onChange={checkDifficulty} /></p>
                    </div>
                    
                    <div className={style.label}>
                <label>Duracion/HS: </label>
                    <input type="text" name="duration" value={state.duration} onChange={handleChange} />
                    </div>
                    
                    <div className={style.label} >
                <p>Temporada: </p>
                    <p>Verano<input type="checkbox"  value={'Verano'} onChange={checkSeason} /></p>
                    <p>Otoño<input type="checkbox"  value={'Otoño'} onChange={checkSeason} /></p>
                    <p>Invierno<input type="checkbox"  value={'Invierno'} onChange={checkSeason} /></p>
                    <p>Primavera<input type="checkbox"  value={'Primavera'} onChange={checkSeason} /></p>
                    </div>
                     
                    <div className={style.label} >
                <p>
                    Pais:
                    <input type="text" name="countries" value={state.countries} onChange={handleChange} />
                </p>
                    </div>  

                <button className={style.create} type="submit">¡Crear Receta!</button>
            </form>

        </div>
    )
};

export default CountryCreate;