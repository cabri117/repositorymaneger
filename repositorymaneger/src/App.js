import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Repositorios  from './components/Repositorios'

class App extends Component{


  render(){
    return <div className="container m-3">   <Repositorios /> </div>
  }
}

export default App;

