const getMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=fc623a5ca96ebc475b73176b0c3d5b4b&language=en-US&page=1')
    .then(res => res.json())
    console.log(response)
    return response
}

export default getMovies;