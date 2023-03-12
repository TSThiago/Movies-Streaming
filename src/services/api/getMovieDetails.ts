const getMovieDetails = async (id: number) => {
    const keyCode = "fc623a5ca96ebc475b73176b0c3d5b4b"

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${keyCode}&language=en-US`)
    .then(res => res.json())
    return response

}

export default getMovieDetails;