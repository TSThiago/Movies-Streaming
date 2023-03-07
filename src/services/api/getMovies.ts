const getMovies = async () => {
    const movies = await fetch('https://api.themoviedb.org/3/movie/1?api_key=fc623a5ca96ebc475b73176b0c3d5b4b&language=en-US')
    console.log(movies)
    return movies
}

export default getMovies;