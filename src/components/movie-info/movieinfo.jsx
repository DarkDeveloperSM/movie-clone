import MovieService from '../../services/movie-service'; // MovieService import qiling
import  { useEffect, useState } from 'react';
import "./movieinfo.scss"
import Error from '../error/error';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types'


const MovieInfo = ({movieId}) => {
	const [movie, setMovie] = useState(null)
	const [loading, setloading] = useState(false)
	const [error, setError] = useState(false)

  const movieService = new MovieService(); 

	useEffect(() => {
		updateMovie()
	}, [movieId])

	const updateMovie = () => {
		if(!movieId) {
			return
		}

		setloading(true)

		movieService
			.getDetailedMovie(movieId)
			.then(res => setMovie(res))
			.catch(() => setError(true))
			.finally(() => setloading(false))
	}

	const initialContent = movie || loading || error ? null :  <Spinner/>
	const errorContent = error ? <Error/> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? <Content movie={movie} /> : null

	return (
		<div className='movieinfo'>
			{initialContent}
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}

MovieInfo.propTypes = {
	movieId: PropTypes.number
}

export default MovieInfo


const Content = ({movie}) => {
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
	
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>	
				<p>{movie.description}</p>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object
}