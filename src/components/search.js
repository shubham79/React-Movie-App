import React, {Component} from 'react';
import Select from 'react-select'
import axios from 'axios';
import SearchResult from './searchResult';

import {ROOT_URL, API_KEY} from './App';

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {movie: '', genres: []};
	}

	componentDidMount() {
		const id = {value: 284054}; // Black Panther Movie id
		this.onSelect(id);
	}

	fetchMovie(input) {
		const query = (input === '') ? "  " : "";
			return axios.get(`${ROOT_URL}search/movie?query=${input}${query}&page=1&api_key=${API_KEY}`)
					.then((res) => {
						const results = res.data.results.map((result) => {
								return {value: result.id, label: result.title}	
							});
						console.log(results);
						return {options: results};
					}).catch((error) => console.log(error));
	}

	onSelect(val) {
		axios.get(`${ROOT_URL}movie/${val.value}?api_key=${API_KEY}`)
			.then((res) => {
				this.setState({movie: res.data, genres: res.data.genres});
			});
	}

	render() {
		const bgImg = (this.state.movie.backdrop_path) ? `url(http://image.tmdb.org/t/p/w1280${this.state.movie.backdrop_path})` : "";
		return (

			<section id="search" style={{backgroundImage: bgImg}}>
			    <div className="mask"></div>
			    <div className="container">
			    	<div className="row">
			    		<div className="col-sm-6 col-md-4 searchBar">
				    		<Select.Async
				    			name="form-field-name"
				    			value="one"
				    			loadOptions={this.fetchMovie}
				    			onChange={this.onSelect.bind(this)}
				    		/>
				    	</div>
						<SearchResult
							info={this.state.movie}
							genres={this.state.genres}

						/>
			    	</div>
			    </div>
			</section>
		);
	}
}

export default Search;