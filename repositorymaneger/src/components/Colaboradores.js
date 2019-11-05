import React,{Component} from 'react';


class Colaboradores extends Component{
    state = {
        colaboradores:[],
        top:10,
        url:'',
        auxColaboradores:[]
    }
    constructor(props) {           //Constructor para darle un estado inicial a la clase
        super(props);
       
        const url1 = localStorage.getItem("linkColaboradores");
        this.state = {
            colaboradores:[],
            top:10,
            url:url1,
            auxColaboradores:[]
        }
    
      }



    async componentDidMount(){      // Funcion asincrona, donde llamamos la funcion cargar colaboradores (similar al main)
        
        this.cargarColaboradores();         
    }
   


    onClick = (event) => {          //Funcion para aumentar los colaboradores
      if ( ( ((this.state.top+5) - this.state.auxColaboradores.length ) >= 5 )  &&  ( (this.state.top+5) > this.state.auxColaboradores.length ) ) {
          alert("Llego al tope");
      } 
      else{
      let arrayAux = [];
      var newTop = this.state.top;
      
      if ( ((newTop+5) - this.state.auxColaboradores.length ) < 5 )  {
        var auxTop = ( this.state.auxColaboradores.length - newTop );
        newTop = newTop +auxTop ;
        
      }else{
        newTop = newTop + 5;
      }
      
      
      for (let index = 0; index < newTop ; index++) {
          console.log(index);
          arrayAux.push(this.state.auxColaboradores[index]);
          console.log(arrayAux);
        }
      
        this.setState( { 

            colaboradores:arrayAux,
            counter:0,
            top:newTop,
            url:this.state.url,
            auxColaboradores:this.state.auxColaboradores


             }
            
        );

     }
    }


    async cargarColaboradores(){      // Funcion para cargar los colaboradores

        const url1 = localStorage.getItem("linkColaboradores");
        console.log(url1);
        const url = url1;

        const headers = { "Accept":"application/vnd.github.hellcat-preview+json" }
        const response = await fetch(""+url+"",{ "method":"GET","headers":headers});
        console.log(response);
        const result = await response.json();
        console.log(result);
        let arrayAux = [];

        if (result.length <10) {
          arrayAux = result;
        }else{

        for (let index = 0; index < 10 ; index++) {

            console.log(index);
            arrayAux.push(result[index]);
            console.log(arrayAux);
            }

          }
            this.setState({colaboradores:arrayAux});
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
                   <div className="card-header"  data-tip="Nombre del repositorio">
                        <i className="far fa-user"></i> {elemento.login}
                    </div>
                   <div className="row no-gutters">
                     <div className="col-md-4">
                       <img src={elemento.avatar_url} className="card-img" alt="Avatar" />
                     </div>
                     <div className="col-md-8">
                       <div className="card-body">
                         <span>Contribuciones: {elemento.contributions}</span>

                         <p className="card-text"><a href={elemento.html_url}>Ir al Perfil</a></p>                        
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