import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './Components/ToDo';

const App = (props) => {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;
