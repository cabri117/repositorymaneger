import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Repositorios  from './components/Repositorios'

class App extends Component{

  
  state = {
    prueba : [1,2,3,5]
  }
  render(){
    return <div className="container m-3">   <Repositorios /> </div>
  }
}

export default App;

