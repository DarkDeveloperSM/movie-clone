import  { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import MovieService from '../../services/movie-service'
import MovieInfo from '../movie-info/movieinfo'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import "./row-movies.scss"
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import PropTypes from 'prop-types'


const RowMovies = () => {
	const [loading, setloading] = useState(false)
	const [error, setError] = useState(false)
	const [open, setOpen] = useState(false)
	const [movies, setMovies] = useState([])
	const [movieId, setMovieId] = useState(null)
	const [page, setPage] = useState(2)
	const [newItemLoading, setNewItemLoading] = useState(false)

	// eski usul
	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		open: false,
	// 		movies: []
	// 	}
	// 	this.movieService = new MovieService()
	// }
	// yangi usul
	// state = {
	// 	loading: true,
	// 	error: false,
	// 	open: false,
	// 	movies: [],
	// 	movieId: null,
	// 	page: 2,
	// 	newItemLoading: false
	// }

	const movieService = new MovieService()

	useEffect(() => {
		getTrendingMovies()
	}, [])

	// componentDidMount() {
	// 	this.getTrendingMovies()
	// }

	// componentDidCatch(err, info) {
	// 	console.log(err);
	// 	console.log(info);
	// 	this.setState({error: true})
	// }

	const onClose = () => setOpen(false)

	const onOpen = (id) => {
		setMovieId(id)
		setOpen(true)
	}

	// const onToggleOpen = () => {
	// 	this.setState(({open}) => ({open: !open}))
	// }

	const getTrendingMovies = (page) => {

		movieService.getTrandingMovies(page)		
			.then(res => setMovies(movies => [...movies, ...res]))
			.catch(() => setError(true))
			.finally(() => {
				setloading(false)
				setNewItemLoading(false)
			})
	}

	const getMoreMovies = () => {
		setNewItemLoading(true)
		setPage(page => page+1)
		getTrendingMovies(page)
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading) ? <Content movies={movies} onOpen={onOpen} /> : null

	return (
		<div className='rowmovies'>
			<div className='rowmovies__top'>
				<div className='rowmovies__top-title'>
					<img src='/tranding.svg' alt='' />
					<h1>Trending</h1>
				</div>
				<div className='hr' />
				<a href="#">See more</a>
			</div>
			{errorContent}
			{loadingContent}
			{content}

			<div className='rowmovies__loadmore'>
				<button 
					className='btn btn-secondary' 
					onClick={getMoreMovies}
					disabled={newItemLoading}
				>
					Load More
				</button>
			</div>

			<Modal open={open} onClose={onClose}>
				<MovieInfo movieId={movieId} />
			</Modal>
		</div>
	)
}

export default RowMovies


const Content = ({movies, onOpen}) => {
	return (
		<div className='rowmovies__lists'>	
				{movies.map((movie) => (
					<RowMoviesItem 
						key={movie.id} 
						movie={movie} 
						onOpen={onOpen}
					/>
				))}
		</div>
	)
}

Content.propTypes = {
	movies: PropTypes.array,
	onOpen: PropTypes.func,
}