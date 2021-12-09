import React from 'react';
import './App.css';
import {Route} from 'react-router'

import {Presentacion} from './components/Presentacion';
import {Home} from './components/Home';
import {CountryCreate} from './components/CountryCreate';
import {CountryDetail} from './components/CountryDetail';

function App() {
  return (
    <div className="App">
      <Route exact path={'/'} component={Presentacion} />
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'/create'} component={CountryCreate} />
      <Route exact path={'/home/:id'} component={CountryDetail} />
    </div>
  );
};

export default App;








