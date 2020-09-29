import React from 'react';
import './App.css';
import Product from './Components/Product';

const App = (props) => {
  return (
    <div className="App">
      <Product name={"Apricot"}
               price={"4"}
               description={"From sunny Armenia"} />
    </div>
  );
}

export default App;
