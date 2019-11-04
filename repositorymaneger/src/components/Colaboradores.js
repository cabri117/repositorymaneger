import React,{Component} from 'react';


class Colaboradores extends Component{
    state = {
        colaboradores:[],
        top:10,
        url:'',
        auxColaboradores:[]
    }
    constructor(props) {
        super(props);

        const url1 = localStorage.getItem("linkColaboradores");
        
        this.state = {
            colaboradores:[],
            top:10,
            url:url1,
            auxColaboradores:[]
        }
       
      }


    async componentDidMount(){
        const url1 = localStorage.getItem("linkColaboradores");
        console.log(url1);
        this.setState({totalPerPage:10});
        this.cargarColaboradores();         
    }
   


    onClick = (event) => {
      if ((this.state.top+5) > this.state.auxColaboradores.length ) {
          alert("Llego al tope");
      }else{
      let arrayAux = [];
      let newTop = this.state.top+5;
    
      for (let index = 0; index < newTop ; index++) {
          console.log(index);
          arrayAux.push(this.state.auxColaboradores[index]);
          console.log(arrayAux);
        }
      
        this.setState(
                    {
                        colaboradores:arrayAux,
                        counter:0,
                        top:newTop,
                        url:this.state.url,
                        auxColaboradores:this.state.auxColaboradores
                    }
            
            );

      console.log("Despues del for ",this.state.colaboradores,
      this.state.counter,
      this.state.top,
      this.state.url,
      this.state.auxColaboradores);

        }
    }

    async cargarColaboradores(){
            const url1 = localStorage.getItem("linkColaboradores");
            console.log(url1);
            const url = url1;
            const headers = { "Accept":"application/vnd.github.hellcat-preview+json" }
            const response = await fetch(""+url+"",{ "method":"GET","headers":headers});
            console.log(response);
            const result = await response.json();
            console.log(result);
            this.setState({colaboradores:result});
            this.setState({auxColaboradores:result});
          
    }
    

    render(){
        return (
        <div className="row">
               <div className="col-md-12">
                    <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="./">Repositorio</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Colaboradores</li>
                            </ol>
                    </nav>
               </div>

               {this.state.colaboradores.map(elemento => 
                   {  return <div className="col-md-4" key={elemento.id} >
                   <div className="card mb-3 width-card" >
                   <div className="row no-gutters">
                     <div className="col-md-4">
                       <img src={elemento.avatar_url} className="card-img" alt="Avatar" />
                     </div>
                     <div className="col-md-8">
                       <div className="card-body">
                         <h5 className="card-title"> Nombre: {elemento.login}</h5>
                         <span>Contribuciones: {elemento.contributions}</span>

                         <p className="card-text"><a href={elemento.html_url}>{elemento.html_url}</a></p>
                         <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        
                        </div>
                     </div>
                   </div>
               </div>
               </div>
                    })
                    
                }
                

                <div className="col-md-12 text-center">
                    <button className="btn btn-primary btn-block" onClick={this.onClick} ><i className="fas fa-angle-down"></i> Obtener más</button>
               </div>
        </div>
        )

    }


}

export default Colaboradores; 