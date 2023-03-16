const getWatchedMovies = async () => {
    const response = await fetch('https://api-generator.retool.com/E7hhVD/watched_movies')
    .then(res => res.json())
    return response;
}

export default getWatchedMovies;