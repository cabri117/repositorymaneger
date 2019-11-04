import React ,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import Repositorios  from './components/Repositorios'
import Colaboradores  from './components/Colaboradores'

class App extends Component{


  render(){
    return <Router>

            <div className="container m-3">
              <Route exact path="/">
                <Repositorios />
              </Route>
              <Route path="/colaboradores">
                  <Colaboradores />
              </Route>

            </div>
    </Router>    
  }
}

export default App;

