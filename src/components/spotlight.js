import React, {Component} from 'react';
import axios from 'axios';

import Movies from './movies';
import {ROOT_URL, API_KEY} from './App';

class Spotlight extends Component {
	currYear = (new Date()).getFullYear();

	constructor(props) {
		super(props);
		this.state = {movies: [], selected: 1};
	}

	componentDidMount() {
		this.fetchMovies(this.getInTheaterUrl());
	}


	fetchMovies(url) {
		axios.get(`${ROOT_URL}discover/movie?${url}&api_key=${API_KEY}`)
			.then((res) => {
				this.setState({
					movies: this.getFirst4Results(res.data.results)
				})
			});	
	}

	clickHandler(arg) {
		let url = "";
		switch(arg) {
			case 1:
				url = this.getInTheaterUrl();
				break;
			case 2:
				url = `sort_by=popularity.desc&primary_release_year=${this.currYear}`;
				break;
			case 3:
				url = `sort_by=revenue.desc&primary_release_year=${this.currYear}`;
				break;
			default:
				break;
		}
		this.fetchMovies(url);
		this.setState({selected: arg});
	}

	isActive(val) {
		return val === this.state.selected ? "nav-link active" : "nav-link";
	}

	getInTheaterUrl() {
		let d = new Date();
		const currDate = d.getDate();
		const currMonth = d.getMonth()+1;
		const currYear = d.getFullYear();
		d.setDate(d.getDate() - 14);
		const date = d.getDate();
		const month = d.getMonth()+1;
		const year = d.getFullYear();
		const current = currYear + "-" + currMonth + "-" + currDate;
		const start = year + "-" + month + "-" + date;
		return `primary_release_date.gte=${start}&primary_release_date.lte=${current}&sort_by=popularity.desc`;
	}

	getFirst4Results(results) {
		let movies = [];
		for (let i = 0; i < 12; i++) {
			movies.push(results[i]);
		}
		return movies;
	}

	render() {
		
		return (
			<section id="spotlight">
				<div className="container">
				    <div className="heading" style={{"padding":"1vh"}}>
				        <i className="fa fa-film"></i> Movie Listings
				    </div>
				    <div className="pills">
				        <ul className="nav">
				        	<li className="nav-item">
				            	<a 
				            		className={this.isActive(1)} 
				            		onClick={this.clickHandler.bind(this, 1)} >In Theaters</a>
				        	</li>
				        	<li className="nav-item">
				            	<a 
				            		className={this.isActive(2)} 
				            		onClick={this.clickHandler.bind(this, 2)} >{this.currYear} Top Rated</a>
				        	</li>
				        	<li className="nav-item">
				            	<a
				            		className={this.isActive(3)} 
				            		onClick={this.clickHandler.bind(this, 3)} >{this.currYear} Highest Crossing</a>
				        	</li>
				        </ul>
				    </div>
				    
					<Movies movies={this.state.movies} />

	  			</div>
			</section>
		);
	}
}

export default Spotlight;