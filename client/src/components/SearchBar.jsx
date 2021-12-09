import React from "react";
import { useDispatch } from "react-redux";
import {getCountryName} from '../actions/index';

export function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = React.useState();

  const handleInputChange = (e) => setName(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountryName(name));
    setName("");
  };

  return (
    <div>
       <form onSubmit={handleSubmit} >
        <input  type='text' placeholder='Buscar' value={name} onChange={handleInputChange}/>
        <button  type="submit">Buscar</button>
        </form>
    </div>
  )
}

export default SearchBar;
