import React from 'react';
import './App.css';
import Product from './Components/Product';

const App = (props) => {
  return (
    <div className="App">
      <Product name="Apricot"
               price="A few drams"
               description="From sunny Armenia" />
    </div>
  );
}

export default App;
