const getWatchedMovies = async () => {
    const response = await fetch('https://apigenerator.dronahq.com/api/-B7mDXTe/WatchedMovies')
    .then(res => res.json())
    return response;
}

export default getWatchedMovies;