import React from 'react';
import './App.css';
import Calendar from './Components/Calendar';
import Header from './Components/Header';
import Main from './Components/Main';
import Navbar from './Components/Navbar';

const App = (props) => {
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <Navbar />
        <Main />
        <Calendar />
    </div>
    </div >
  );
}

export default App;
