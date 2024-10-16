import  { useEffect, useState } from 'react'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import "./hero.scss"
import PropTypes from 'prop-types'; 
// import Button from '../button/button'

const  Hero = () => {
	const [movie, setMovie] = useState(null)
	const [loading, setloading] = useState(true)
	const [error, setError] = useState(false)

	const movieService = new MovieService()

	useEffect(() => {
		UpdateMovie()
		// eslint-disable-next-line
	}, [])

	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		movie: {},
	// 		loading: true,
	// 		error: false
	// 	}
	// 	this.movieService = new MovieService()
	// }

	// componentDidMount() {
	// 	this.UpdateMovie()
	// }

	const UpdateMovie = () => {
		setloading(true)

		movieService.getRandomMovie()
			.then(res => setMovie(res))
			.catch(() => setError(true))
			.finally(() => setloading(false))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading) ? <Content movie={movie} /> : null

	return (
		<div className='hero'>
			<div className='hero__info'>
				<h2>FIND MOVIES</h2>
				<h1>TV shows and more</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sunt necessitatibus veritatis labore provident similique neque praesentium debitis maiores. Nihil consectetur, veniam labore magnam ab similique optio perferendis error earum.
				</p>
				<div>
					<button className='btn btn-primary'>Details</button>
					<button className='btn btn-secondary' onClick={UpdateMovie} >Random Movie</button>
				</div>
			</div>
			<div className='hero__movie'>
				{errorContent}
				{loadingContent}
				{content}
			</div>
		</div>
	)
}

export default Hero

const Content = ({movie}) => {
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>	
				<p>{movie.description && movie.description.length >= 250 
					? `${movie.description.slice(0,250)}...` 
					: movie.description}
				</p>
					{/* <button className='btn btn-secondary'>Radnom movie</button> */}
				<button className='btn btn-primary'>Details</button>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object
}