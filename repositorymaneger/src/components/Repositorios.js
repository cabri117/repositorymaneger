import React,{Component} from 'react';
import ReactTooltip from 'react-tooltip';


class Repositorios extends Component {
    state = {
        repositorios:[],
        buscador:'js'
    }
    async componentDidMount(){     // Funcion asincrona, donde llamamos la funcion cargar repositorio (similar al main)
        this.cargarRepositorio();         

    }
    
    onKeyUp = e => {               // Funcion asociada al evento que funciona cuando suelta una tecla
       
        this.setState({buscador:e.target.value})
        if(this.state.buscador.length <= 0)
        this.setState({buscador:'js'})
        if(e.key == 'Enter'){
          this.cargarRepositorio();
        }
    }
    onClickSearch = e => {        //Funcion que se dispara al darle click al boton buscar
       
      this.setState({buscador:e.target.value})
      if(this.state.buscador.length <= 0)
      this.setState({buscador:'js'})
      this.cargarRepositorio();
      
  }
    onClick = (event,id) => {    //Funcion que nos permite navegar a colaboradores
      console.log(id);
      if(localStorage != null){
      localStorage.setItem("linkColaboradores",id);
      window.location = "/colaboradores";
    }else{

      alert("No tiene colaboradores");
    }
    }

    async cargarRepositorio(){
        
            const url = "https://api.github.com/search/repositories?q="+this.state.buscador+"+in:full_name&type=Repositories&sort=score&order=desc&per_page=6"; //Buscar por el nombre del repositorio
            console.log(url);
            const headers = { "Accept":"application/vnd.github.cloak-preview" }
            const response = await fetch(url,{ "method":"GET","headers":headers});
            const result = await response.json();
  
            if(result.items != null)
            this.setState({repositorios:result.items});
            else
            this.setState({repositorios:[]});
            console.log(result);
           
    }

    isEmpty = (e) =>{
      console.log(e);
      if (e == null) {
        return 'Esta vacío'
      }
      return e;
    }
    

    render(){
        return (
        <div className="row">
                <div className="col-md-12">
                    <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active" aria-current="page">Repositorio</li>
                                
                            </ol>
                    </nav>
               </div>
                <div className="col-md-12">
                  <div className="input-group mb-3">
                    <input type="text" autoComplete="off" className="form-control"  name="buscador" onKeyUp={this.onKeyUp} placeholder="Buscador"  aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.onClickSearch} ><i className="fas fa-search"></i> Buscar</button>
                    </div>
                  </div>
                   
                </div>
                
                {this.state.repositorios.map(elemento => 
                   {     return <div className="col-md-4" key={elemento.id} >

         <div className="card text-center mb-3">
              <div className="card-header"  data-tip="Nombre del repositorio">
              <i className="far fa-folder"></i> {this.isEmpty(elemento.full_name)}
             </div>
         <div className="card-body">
            <span className="card-title">
            <div className="row">
                  <div className="col-md-12 text-right"><i className="fas fa-question-circle" data-tip="" ></i></div>
                  <div  className="col-md-5 text-left badge badge-success p-2"   data-tip="Cantidad de estrella">
                      <div className="row">
                          <div className="col-md-4 text-center">
                                <i className="fas fa-star"></i>
                          </div>
                          <div className="col-md-4 text-rigth">
                                <span className="badge badge-light">{elemento.stargazers_count}</span>
                          </div>
                      </div>
                  </div>

                  <div  className="col-md-5  offset-md-2 text-left badge badge-warning p-2 "  data-tip="Cantidad de problemas">
                      <div className="row">
                              <div className="col-md-6 text-center">
                                  <i className="fas fa-info-circle"></i>
                              </div>
                              <div className="col-md-6 text-rigth ">
                                  <span className="badge badge-light">{elemento.open_issues_count}</span>
                              </div>
                       </div>
                  </div>

                  <div className="col-md-12 text-left p-2" data-tip="Lenguaje de programación">
                      <span ><i className="fas fa-language"></i> {this.isEmpty(elemento.language) }</span>
                  </div>

                  <div className="col-md-12">
                    <hr />
                  </div>
            </div>
    </span>
    <h6 data-tip="Descripción del repositorio">Descripción</h6 >
    <hr />
    <p className="card-text text-left text-justify" >{this.isEmpty(elemento.description)}</p>
  </div>
  <div className="card-footer text-muted">
          <div className="row" >
                  <div className="col-md-6">
                      <button type="button" className="btn btn-link" onClick={(evt) => this.onClick(evt,elemento.contributors_url)} >
                        <i className="fas fa-users"></i> Colaboradores
                      </button>
                  </div>
                  <div className="col-md-6">
                  <a className="btn btn-link" target="_blank" href={elemento.html_url}> 
                  <i className="fas fa-link"></i> Ir al Repositorio
                  </a>
                  </div>
          </div> 
  </div>
</div>

                   

<ReactTooltip />
 </div>
     })
                    
  }

 </div>
    )

  }
}

export default Repositorios;