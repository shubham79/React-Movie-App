import React, { Component } from 'react';
import Spotlight from './spotlight';
import './App.css';
import 'react-select/dist/react-select.css';
import Search from './search';
import { scaleRotate as Menu } from 'react-burger-menu';
import { Redirect,Route, Router, Link } from 'react-router-dom';
import Home from './home';
import Auth from '../Auth/Auth';	
import Callback from '../Callback/Callback';
import history from '../history';
import Popup from 'react-popup';
import Profile from '../Profile/Profile';


const auth = new Auth();
const handleAuthentication = ({location}) => {
	if (/access_token|id_token|error/.test(location.hash)) {
	  auth.handleAuthentication();
	}
  }



export const API_KEY = 'e8174be6da251dccb28b91ea2e221b2d';
export const ROOT_URL = 'https://api.themoviedb.org/3/';

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
		  menuOpen: false
		}
	  }
	  handleStateChange (state) {
		this.setState({menuOpen: state.isOpen})  
	  }
	  
	  // This can be used to close the menu, e.g. when a user clicks a menu item
	  closeMenu () {
		this.setState({menuOpen: false})
	  }
	
	  // This can be used to toggle the menu, e.g. when using a custom icon
	  // Tip: You probably want to hide either/both default icons if using a custom icon
	  // See https://github.com/negomi/react-burger-menu#custom-icons
	  toggleMenu () {
		this.setState({menuOpen: !this.state.menuOpen})
		}
		
		logout(){
				auth.logout();
				this.closeMenu();
        Popup.alert('You have successfully logged out!!','Movie-APP Notification');
		}
	
	
	render() 
	{
		const { isAuthenticated } = auth;

		var styles = {
			bmBurgerButton: {
			  position: 'absolute',
			  width: '36px',
			  height: '30px',
			  //left: '36px',
			  right:'20px',
			  top: '20px'
			},
			bmBurgerBars: {
			  background: '#a0a7a0'
			},
			bmCrossButton: {
			  height: '24px',
			  width: '24px'
			},
			bmCross: {
			  background: '#bdc3c7'
			},
			bmMenu: {
			  background: '#373a47',
			  padding: '2.5em 1.5em 0',
			  fontSize: '1.15em'
			},
			bmMorphShape: {
			  fill: '#373a47'
			},
			bmItemList: {
			  color: '#b8b7ad',
			  padding: '0.8em'
			},
			bmOverlay: {
			  background: 'rgba(0, 0, 0, 0.3)'
			}
		  };

		  var isMenuOpen = function(props) {
			
			console.log(this.props);
		  };

		return (
			<Router  history={history}>
				<div id="outer-container">
				  <Menu    isOpen={this.state.menuOpen}
						   onStateChange={(state) => this.handleStateChange(state)} 
						   pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } right styles={ styles }>
				  
    <div>
      <ul>
        <li>
          <Link onClick={() => this.closeMenu()} to="/">Home</Link>
        </li>
				{ isAuthenticated() &&
					<li> 					
          <Link onClick={() => this.closeMenu()} to="/search">Search..</Link>
        </li>
				}
				 <li>
          <Link onClick={() => this.closeMenu()} to="/profile">Profile</Link>
        </li>
				{
					isAuthenticated() && 
					<li>
					<Link onClick={this.logout.bind(this)} to="/">Logout</Link>
							</li>
				}
			
      </ul>

      <hr />

      
      
    </div>
  
				  </Menu>
  					<main id="page-wrap">
					  <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
					  <Route path="/search" render={(props) => ( !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
							<div>
							<Search auth={auth} {...props} /> 
							<Spotlight auth={auth} {...props} /> 
							</div>
            ))} />
						 <Route path="/profile" render={(props) => ( !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
							<div>
							<Profile auth={auth} {...props} /> 
							 
							</div>
            ))} />
					  <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>	
					<Popup />
						</main>
		</div>
				</Router>
				

			
		);
	}
}

export default App;