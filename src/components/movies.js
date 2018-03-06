import React from 'react';
import Movie from './movie';

const Movies = (props) => {
	const {movies} = props;	
	const results = movies.map((movie, i) => <Movie data={movie} key={i} />);
	
	return (
	    <div className="row">
			{results}
		</div>

	);
}
	

export default Movies;