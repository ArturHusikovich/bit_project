import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import ToDo from './Components/ToDo';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import About from './Components/About/About';
import SingleTask from './Components/SingleTask/SingleTask';
import Contacts from './Components/Contacts/Contacts';
import NotFound from './Components/NotFound/NotFound';

const App = (props) => {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/about' exact  component={About} />
        <Route path='/task/:id' exact component={SingleTask} />
        <Route path='/contacts' exact  component={Contacts} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='/404' /> 
      </Switch>

      <Footer />     
    </div>
  );
}

export default App;
