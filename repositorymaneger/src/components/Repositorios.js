import React,{Component} from 'react';

class Repositorios extends Component {
    state = {
        repositorios:[]
    }
    async componentDidMount(){
         
            const url = "https://api.github.com/search/repositories?q="+"js"+"+in:name&type=Repositories&sort=score&order=desc&per_page=6"; //Buscar por el nombre del repositorio
            //curl 

            const response = await fetch(url);
            const result = await response.json();
            this.setState({repositorios:result.items});
            console.log(result);
           

    }

    render(){
        return (
        <div className="row">
                {this.state.repositorios.map(elemento => 
                   {     return <div className="col-md-4">
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