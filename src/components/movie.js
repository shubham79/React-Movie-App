import React from 'react';

const Movie = (props) => {

	const {data} = props;

	return (
		<div className="spotlight-item col-xs-6 col-md-3">
			<img src={`http://image.tmdb.org/t/p/w500${data.poster_path}`} className="img-fluid" alt="Movie Poster" />
			<div className="spotlight-item-overlay">
				<h5>{data.title}</h5>
			</div>
		</div>
	);
}

export default Movie;