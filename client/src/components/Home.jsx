import React from 'react';
import{Link} from 'react-router-dom';
import {useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import {getCountries, orderByName, orderByContinent, getActivities, orderByActivity} from '../actions/index'
import {SearchBar} from './SearchBar';
import {Countries} from './Countries';
import {Paginado} from './Paginado';
import style from './Css/Home.module.css';

export function Home(){
    const dispatch = useDispatch();
    const[order, setOrder] = React.useState('');
    const allCountries = useSelector((state) => state.countries);
    const [currentPage, setCurrentPage] = React.useState(1)
    const [countryPerPage, setCountryPerPage] = React.useState(10)
    const indexOfLastCountry = currentPage * countryPerPage
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage
    const currentCountry = allCountries?.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    };

    useEffect(() => {
        dispatch(getCountries())
    },[dispatch]);
    
    useEffect(() => {
        dispatch(getActivities())
    },[dispatch]);

    function Recargar(e){
        e.preventDefault();
        dispatch(getCountries())
    };

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByContinent(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordernado ${e.target.value}`);
    };

    function handleSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordernado ${e.target.value}`);
    };

    function handleCheck(e){
        e.preventDefault();
        dispatch(orderByActivity(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordernado ${e.target.value}`);
    };

    return(
        <div  >
            <div className={style.back} >

           
            
        <div className={style.all} >
        <Link className={style.link} to={'/create'}><h3>¡Crear una neva receta!</h3></Link>
        <button className={style.buttonR} onClick={e=>{Recargar(e)}} >Recargar Pagina</button>
        </div>
        <SearchBar/>
        

        <div>
        <label>Filtrar por: <select onChange={e => handleSortName(e)}>
            <option name='asc' value='asc'>A-Z</option>
            <option name='desc' value='desc'>Z-A</option>
        </select></label>

        <label>Filtrar por Contienente: <select onChange={e => handleSort(e)}>
            <option value='all'> -- Select --</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
        </select></label>

        <label> Filtrar por Actividad
            <select onChange={e =>handleCheck(e) } >
                <option>-Select-</option>
                <option value="Running">Running</option>
                <option value="Surf">Surf</option>
            </select>
        </label>    

        </div>
        
        <div>
            <Paginado
                countryPerPage={countryPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />
        </div>
            <hr/>
            {
                currentCountry?.map(e =>{
                    return (
                    <Link to={'/home/' + e.id} key={e.id} > 
                    <Countries name={e.name} img={e.img} continente={e.continente}  />
                    </Link>
                    )
                })
            }

            </div>
        </div>

    )
};

export default Home;