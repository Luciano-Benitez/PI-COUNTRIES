import React from 'react';

export function Paginado({allCountries, countryPerPage, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allCountries/countryPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav >
            {
                pageNumbers?.map(number => (
                    <button key={number} onClick={() => paginado(number)} >{number}</button>
                ))
            }
        </nav>
    )
};

export default Paginado;