const getFavoriteMovies = async () => {
    const response = await fetch('https://apigenerator.dronahq.com/api/4sHK6s2W/users_favorite')
    .then(res => res.json())
    return response;
}

export default getFavoriteMovies;