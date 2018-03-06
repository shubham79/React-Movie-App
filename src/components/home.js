import React, {Component} from 'react';
import './home.css';
import Auth from '../Auth/Auth';
import Popup from 'react-popup';
import './popup.example.css';

//const auth = new Auth();


class Home extends Component {

    constructor(props) {
        super(props)
        
    }
    login() {
        this.props.auth.login();
      }
      logout(){
        this.props.auth.logout();
        Popup.alert('You have successfully logged out!!','Movie-APP Notification');
      }
    render()
       
    
    {
      const { isAuthenticated } = this.props.auth;
        return (
            <div>
            <section  id="loginform" className="load2 outer-wrapper" >
              <div className="inner-wrapper">
                <div className="logoloadhead">
                  <img src="Fox_Moxie_Channel.png" alt="Logo" style={{"height":"100px"}}></img>
                </div>
                <div className="container">
             
                  <div className="Absolute-Center is-Responsive">
                    <div className="col-sm-12 col-md-12 ">
                     <h2 style={{"color":"white"}}>MOVIE APP</h2>
                   
                        
                       <div className="col-sm-12">
                         <form method="get" className="sidebar-form">
                            <div className="input-group">
                              {
                                isAuthenticated() && 
                                <button onClick={this.logout.bind(this)} type="button" className="btn btn-primary btn-block">Logout</button>
                              }
                              {
                                !isAuthenticated() &&
                                <button onClick={this.login.bind(this)} type="button" className="btn btn-primary btn-block">Login</button>
                              }
                             
                             
                            </div>
                          </form>
                       </div>
                      
                    </div>
                  </div>
                
                </div>
              </div>
      
            
            </section>
            <Popup />
          </div>
        )
        
    }
    
   
}
  
  export default Home;