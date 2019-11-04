import React,{Component} from 'react';


class Repositorios extends Component {
    state = {
        repositorios:[],
        buscador:'js'
    }
    async componentDidMount(){

      this.cargarRepositorio(); //Llamada a la funcion cagarRepositorio
           

    }
 
    onChange = e =>{   // Funcion para mostrar el resultado de una busqueda

      this.setState({buscador:e.target.value})
      if(this.state.buscador.length <= 0)
      this.setState({buscador:'js'})
      if(e.key == 'Enter' ){
        this.cargarRepositorio();
      }
    }

    setOnClick = (event, id) =>{
      console.log(id);
      localStorage.setItem("linkColaboradores", id);
      window.location = "/colaboradores";

      
    }

    
    async cargarRepositorio(){ // Funcion que nos permite buscar los repositorios segun la condicion especificada 

      const url = "https://api.github.com/search/repositories?q="+this.state.buscador+"+in:full_name&type=Repositories&sort=score&order=desc&per_page=6"; //Buscar por el nombre del repositorio
      //curl 

      const headers = { "Accept":"application/vnd.github.cloak-preview" }


      const response = await fetch(url,{ "method":"GET","headers":headers});
      const result = await response.json();

      if(result.items != null)
      this.setState({repositorios:result.items});
      else
      this.setState({repositorios:[]});

      console.log(result);

      // hola de nuevo


    }

    render(){
        return (
        <div className="row">
                <div className="input-group mb-3">
                <input type="text" className="form-control" onKeyUp={this.onChange}  placeholder="Repository name" aria-label="Repository name" aria-describedby="button-addon2"></input>
                <div className="input-group-append">
               <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(evt)=>this.setOnClick(evt, elemento.contributors_url)}>Calaboradores</button>
              </div>
              </div> 
              
                {this.state.repositorios.map(elemento => 
                   {     return <div className="col-md-4" key={elemento.id}>
                   <div className="card mb-3 width-card" >
                   <div className="row no-gutters">
                     <div className="col-md-4">
                       <img src="http://lorempixel.com/180/250/sports/" className="card-img" alt="..." />
                       </div>
                     <div className="col-md-8">
                       <div className="card-body">
                         <h5 className="card-title">{elemento.full_name}</h5>
                         <span>{elemento.language}</span>
                         <span>{elemento.stargazers_count}</span>
                         <span>{elemento.open_issues_count}</span>
                         <p className="card-text">{elemento.description}</p>
                         <p className="card-text"><a href={elemento.html_url}>{elemento.html_url}</a></p>
                         <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        
                       </div>
                     </div>
                   </div>
               </div>
               </div>
                    })
                    
                }
          

        </div>
        )

    }
}

export default Repositorios;




