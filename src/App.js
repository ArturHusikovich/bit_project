import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import ToDo from './Components/ToDo';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import About from './Components/About/About';
import SingleTask from './Components/SingleTask/SingleTask';
import Contacts from './Components/Contacts/Contacts';
import NotFound from './Components/NotFound/NotFound';
import { connect } from 'react-redux';
import Spinner from './Components/Spinner/Spinner';

const App = (props) => {

  if(props.successMessage){
    toast.success(props.successMessage);
  }

  if (props.errorMessage) {
    toast.error(props.errorMessage);
  }

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

      <ToastContainer position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover />
      
      {props.loading && <Spinner />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    loading: state.loading
  }
}
export default connect(mapStateToProps)(App);
